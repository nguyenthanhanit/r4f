import React from "react";
import {title, subtitle} from "@/components/primitives";
import {Progress} from "@nextui-org/progress";
import {getUser} from "@/utils/user";

export default async function Home() {
    const user = await getUser();

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Hi&nbsp;</h1>
                <h1 className={title({color: "violet"})}>{user.name}&nbsp;</h1>
                <br/>
                <h1 className={title()}>
                    bạn đã chạy {user.distance} km trong năm 2023 rồi đó.
                </h1>
                <h2 className={subtitle({class: "mt-4"})}>
                    thật tuyệt vời, hãy cố gắng phát huy nhé
                </h2>
            </div>

            <Progress
                size="md"
                value={10}
                color="success"
                showValueLabel={true}
                className="max-w-md"
                label='10 Km'
            />
        </section>
    );
}
