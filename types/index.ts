import {SVGProps} from "react";
import moment from "moment/moment";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
    size?: number;
};

export type ChartProps = {
    labels: string[],
    datasets: {
        label: string,
        borderColor: string,
        backgroundColor: string,
        data: number[],
    }[]
};

export type SummaryActivityProps = {
    start_date_local: moment.MomentInput,
    sport_type: string,
};