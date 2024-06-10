import mongoose, { Schema } from 'mongoose';
import { ENV } from '../constants';

const { months } = ENV;

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
        originalVideoPublishSchedule: {
            month: {
                type: String,
                enum: months,
                required: true,
            },
            year: {
                type: Number,
                required: true,
            },
        },
        schedule: {
            month: {
                type: String,
                enum: months,
                required: true,
            },
            year: {
                type: Number,
                required: true,
            },
        },
    },
    {
        timestamps: true,
    },
);

const RawPost = mongoose.model('RawPost', rawPostsSchema);

export default RawPost;
