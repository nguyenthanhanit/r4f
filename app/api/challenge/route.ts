import {NextResponse} from 'next/server';
import dbConnect from "@/lib/dbConnect";
import Challenge from "@/models/Challenge";

export async function GET() {
    await dbConnect();
    const challenge = await Challenge.find({});

    return NextResponse.json(challenge)
}