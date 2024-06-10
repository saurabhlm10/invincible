import RawPost from '../models/RawPost.model';
import { IGetAllMonthNicheRawPosts, IGetAllNicheRawPosts } from '../types/RawPost.type';

export const getAllNicheRawPosts = async (data: IGetAllNicheRawPosts) => {
    const { nicheId } = data;

    return RawPost.find({ nicheId });
};

export const getAllMonthNicheRawPosts = async (data: IGetAllMonthNicheRawPosts) => {
    const { nicheId, month, year } = data;

    return RawPost.find({ nicheId, schedule: { month, year } });
};
