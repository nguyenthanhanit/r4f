import React from "react";
import moment from "moment";
import {subtitle, title} from "@/components/primitives";
import {getServerSession} from "next-auth/next";
import {config} from "@/auth";

async function getStats(id: string, accessToken: string) {
    const res = await fetch(`https://www.strava.com/api/v3/athletes/${id}/stats`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
        },
    })

    return await res.json();
}

export default async function Home() {
    const session = await getServerSession(config);

    if (!session) {
        return <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                Đăng nhập rồi tham gia thử thách, tha hồ đóng phạt nha
            </div>
        </section>
    }

    const idStrava = session?.user?.sub;
    const stats = await getStats(idStrava, session?.user?.accessToken);
    const km = stats?.ytd_run_totals?.distance / 1000;

    return (
        <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block max-w-lg text-center justify-center">
                <h1 className={title()}>Chào&nbsp;</h1>
                <h1 className={title({color: "violet"})}>{session?.user?.name}&nbsp;</h1>
                <br/>
                <h1 className={title()}>
                    bạn đã chạy {km.toFixed(1)} km trong năm {moment().year()} rồi đó.
                </h1>
                <h2 className={subtitle({class: "mt-4"})}>
                    thật tuyệt vời, hãy cố gắng phát huy nhé
                </h2>
            </div>
        </section>
    );
}
