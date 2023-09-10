import {NextResponse} from 'next/server';
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export async function GET() {
    await dbConnect();
    const user = await User.find({});

    return NextResponse.json(user)
}