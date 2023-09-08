'use client'

import React from "react";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Button} from "@nextui-org/button";
import moment from 'moment';

export default function ChallengesPage() {
    const [isJoined, setIsJoined] = React.useState(false);
    const list = [
        {
            title: "Orange",
            from: 1688144400,
            to: 1694098410,
            total_distance: 200,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Tangerine",
            from: 1688144400,
            to: 1694098410,
            total_distance: 50,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Raspberry",
            from: 1688144400,
            to: 1694098410,
            total_distance: 10,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Lemon",
            from: 1688144400,
            to: 1694098410,
            total_distance: 20,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Avocado",
            from: 1688144400,
            to: 1694098410,
            total_distance: 60,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Lemon 2",
            from: 1688144400,
            to: 1694098410,
            total_distance: 100,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Banana",
            from: 1688144400,
            to: 1694098410,
            total_distance: 290,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Watermelon",
            from: 1688144400,
            to: 1694098410,
            total_distance: 102,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
        {
            title: "Watermelon",
            from: 1688144400,
            to: 1694098410,
            total_distance: 21,
            description: 'Complete a 13.1 mile (21.1 km) run',
            isJoined: true,
            members: 90,
        },
    ];

    return (
        <div className="gap-2 grid grid-cols-2 sm:grid-cols-3">
            {list.map((item, index) => (
                <Card className="max-w-[610px]" shadow="sm" key={index}>
                    <CardHeader className="justify-between">
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1 items-start justify-center">
                                <h4 className="text-small font-semibold leading-none text-default-600">{item.title}</h4>
                            </div>
                        </div>
                        <Button
                            className={isJoined ? "bg-transparent text-foreground border-default-200" : ""}
                            color="primary"
                            radius="full"
                            size="sm"
                            variant={isJoined ? "bordered" : "solid"}
                            onPress={() => setIsJoined(!isJoined)}
                        >
                            {isJoined ? "Joined" : "Join"}
                        </Button>
                    </CardHeader>
                    <CardBody className="overflow-visible">
                        <span className="pt-2">{item.description}</span>
                        <p>{moment.unix(item.from).format('DD-MM-YYYY')} to {moment.unix(item.to).format('DD-MM-YYYY')}</p>
                        <p>{item.total_distance} Km</p>
                    </CardBody>
                    <CardFooter className="gap-3">
                        <div className="flex gap-1">
                            <p className="font-semibold text-default-400 text-small">{item.members}</p>
                            <p className="text-default-400 text-small">Members</p>
                        </div>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
