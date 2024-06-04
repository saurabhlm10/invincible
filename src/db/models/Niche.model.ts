import mongoose, { Schema } from 'mongoose';

const nicheSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        pages: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
        },
    },
    { timestamps: true },
);

const Niche = mongoose.model('Niche', nicheSchema);

export default Niche;
