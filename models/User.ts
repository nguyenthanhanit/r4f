import mongoose from 'mongoose'

export interface Users extends mongoose.Document {
    name: string
    avatar: string
    distance: number
}

/* UserSchema will correspond to a collection in your MongoDB database. */
const UserSchema = new mongoose.Schema<Users>({
    name: String,
    avatar: String,
    distance: Number,
})

export default mongoose.models.User || mongoose.model<Users>('User', UserSchema)