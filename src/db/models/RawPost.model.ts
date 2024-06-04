import mongoose, { Schema } from 'mongoose';

const rawPostsSchema = new Schema(
    {
        originalViews: {
            type: Number,
            required: true,
        },
        nicheId: {
            type: Schema.Types.ObjectId,
            required: true,
            Ref: 'Niche',
        },
        source_url: {
            type: String,
            required: true,
            unique: true,
        },
        source: {
            type: String,
            enum: ['tiktok'],
        },
        caption: {
            type: String,
            required: true,
        },
        video_url: {
            type: String,
            unique: true,
        },
        cover_url: {
            type: String,
            unique: true,
        },
        media_url: {
            type: String,
            unique: true,
        },
    },
    {
        timestamps: true,
    },
);

const RawPost = mongoose.model('RawPost', rawPostsSchema);

export default RawPost;
