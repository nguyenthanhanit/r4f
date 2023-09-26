import mongoose from 'mongoose'

export interface Targets extends mongoose.Document {
    idStrava: string
    distance: number
    year: number
}

/* TargetSchema will correspond to a collection in your MongoDB database. */
const TargetSchema = new mongoose.Schema<Targets>({
    idStrava: String,
    distance: Number,
    year: Number,
})

export default mongoose.models.Target || mongoose.model<Targets>('Target', TargetSchema)