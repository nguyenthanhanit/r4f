"use client";

import React, {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import moment from "moment";
import {ChartProps, SummaryActivityProps} from "@/types";
import {round} from "@kurkle/color";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top' as const,
        },
        title: {
            display: true,
            text: 'Thống kê trong năm',
        },
    },
};

const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

const dataChart = {
    labels: [],
    datasets: [{
        label: 'Chạy bộ',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        data: [],
    }],
};

export const Chart = () => {
    const {data: session} = useSession();
    const [data, setData] = useState<ChartProps>(dataChart);
    const [loading, setLoading] = useState(true);

    // This code inside useEffect will run when the component is mounted
    useEffect(() => {
        const from = moment().startOf('year').unix();
        const to = moment().startOf('month').add(1, 'M').unix();

        const fetchData = async () => {
            const res = await fetch(`https://www.strava.com/api/v3/athlete/activities?after=${from}&before=${to}&per_page=200&access_token=${session?.user?.accessToken}`);

            return await res.json();
        }

        if (session?.user?.accessToken) {
            fetchData().then(res => {
                const currentMonth = moment().month();
                const monthsToNow = months.slice(0, currentMonth + 1);
                let labels: string[] = [];
                let dataPoint: number[] = [];

                monthsToNow.forEach((month, index) => {
                    const activities = res.filter((activity: SummaryActivityProps) => {
                        return index === moment(activity.start_date_local).month() && activity.sport_type === 'Run';
                    });
                    const distances = activities.map((activity: { distance: number; }) => activity.distance);
                    const sumWithInitial = distances.reduce((accumulator: number, currentValue: number) => accumulator + currentValue, 0);

                    labels.push(month);
                    dataPoint.push(round(sumWithInitial / 1000));
                })

                data.labels = labels;
                data.datasets[0].data = dataPoint;

                setLoading(false);
            });
        }
    }, [session]);

    if (loading) {
        return <>Loading...</>;
    }

    return <Line options={options} data={data}/>;
}