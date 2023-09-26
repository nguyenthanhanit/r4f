import dbConnect from "@/lib/dbConnect";
import Target from "@/models/Target";

export const getTarget = async (id: string, year: number) => {
    await dbConnect();

    return Target.findOne({idStrava: id, year}).exec();
}

export const updateTarget = async (wheres: {}, attributes: {}, upsert: boolean = false) => {
    await dbConnect();

    return Target.findOneAndUpdate(wheres, attributes, {
        upsert
    })
}