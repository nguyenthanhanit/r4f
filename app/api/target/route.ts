import {NextResponse} from 'next/server';
import {updateTarget} from "@/utils/target";
import {auth} from "@/auth";
import moment from "moment";

export async function POST(req: Request) {
    const session = await auth();

    if (!session) {
        return NextResponse.json({
            content: 'This is protected content. You can access this content because you are signed in.',
        })
    }

    const {target} = await req.json();

    const res = await updateTarget(
        {idStrava: session?.user?.sub},
        {
            idStrava: session?.user?.sub,
            distance: target,
            year: moment().year(),
        },
        true
    );

    return NextResponse.json(res)
}