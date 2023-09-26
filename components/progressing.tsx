"use client";

import React, {useState} from "react";
import {Input} from "@nextui-org/input";
import {Progress} from "@nextui-org/progress";
import {Button} from "@nextui-org/button";

type Props = {
    targetInYear: number | undefined;
};

export const Processing = ({targetInYear}: Props) => {
    const [target, setTarget] = useState<string>('');

    const updateData = async () => {
        const res = await fetch('/api/target', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({target}),
        })

        const data = await res.json();
    }

    if (targetInYear) {
        return <Progress
            size="md"
            value={10}
            color="success"
            showValueLabel={true}
            className="max-w-md"
            label='10 Km'
        />
    }

    return <>
        Thiết lập mục tiêu của bạn ngay hôm nay để tạo động lực cố gắng nào
        <Input
            type="number"
            label="Số Km"
            className="max-w-xs"
            value={target}
            onValueChange={setTarget}
        />
        <Button color="primary" onClick={updateData}>
            Lưu
        </Button>
    </>
}