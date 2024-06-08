import { QueryOptions, UpdateQuery } from 'mongoose';
import { INicheApifyDatasetStatus } from '../models/NicheApifyDatasetDetails.model';

export interface IGetNicheApifyDatasetStatusParams {
    nicheId: string;
}

export interface ICreateNicheApifyDatasetStatusParams {
    nicheId: string;
}

export interface ICheckCollectionPageAlreadyInNicheApifyDatasetStatusParams {
    nicheId: string;
    collectionPageId: string;
}

export type IUpdateNicheApifyDatasetStatus = {
    identifier: {
        nicheId: string;
    };
    updateData: UpdateQuery<INicheApifyDatasetStatus>;
    options?: QueryOptions;
};
