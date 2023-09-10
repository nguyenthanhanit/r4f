import mongoose from 'mongoose'

export interface Challenges extends mongoose.Document {
    title: string
    from: number
    to: number
    distance: number
    description: string
    members: number
}

/* ChallengeSchema will correspond to a collection in your MongoDB database. */
const ChallengeSchema = new mongoose.Schema<Challenges>({
    title: String,
    from: Number,
    to: Number,
    distance: Number,
    description: String,
    members: Number,
})

export default mongoose.models.Challenge || mongoose.model<Challenges>('Challenge', ChallengeSchema)