import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

export const getUser = async () => {
    await dbConnect();

    return User.findById('64fd97c6ff2d295a0a79684c').exec();
}