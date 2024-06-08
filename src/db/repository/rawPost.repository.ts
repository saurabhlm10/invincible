import RawPost from '../models/RawPost.model';
import { IGetAllNicheRawPosts } from '../types/RawPost.type';

export const getAllNicheRawPosts = async (data: IGetAllNicheRawPosts) => {
    const { nicheId } = data;

    return RawPost.find({ nicheId });
};
