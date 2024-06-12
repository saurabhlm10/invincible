import mongoose from 'mongoose';
import RawPost from '../models/RawPost.model';
import { IAddPagesToRawPostsParams, IGetAllMonthNicheRawPosts, IGetAllNicheRawPosts } from '../types/RawPost.type';

export const getAllNicheRawPosts = async (data: IGetAllNicheRawPosts) => {
    const { nicheId } = data;

    return RawPost.find({ nicheId });
};

export const getAllMonthNicheRawPosts = async (data: IGetAllMonthNicheRawPosts) => {
    const { nicheId, month, year } = data;

    return RawPost.find({ nicheId, schedule: { month, year } });
};

export const addPagesToRawPosts = async (data: IAddPagesToRawPostsParams) => {
    const { posts } = data;
    const operations = posts.map((post) => ({
        updateOne: {
            filter: { _id: new mongoose.Types.ObjectId(post.id) },
            update: { $set: { page: post.page } },
        },
    }));

    return RawPost.bulkWrite(operations);
};
