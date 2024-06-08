import NicheApifyDatasetStatus from '../models/NicheApifyDatasetDetails.model';
import {
    ICheckCollectionPageAlreadyInNicheApifyDatasetStatusParams,
    ICreateNicheApifyDatasetStatusParams,
    IGetNicheApifyDatasetStatusParams,
    IUpdateNicheApifyDatasetStatus,
} from '../types/NicheApifyDatasetStatus.type';

export const getNicheApifyDatasetStatus = (data: IGetNicheApifyDatasetStatusParams) => {
    const { nicheId } = data;

    return NicheApifyDatasetStatus.findOne({ nicheId });
};

export const createNicheApifyDatasetStatus = (data: ICreateNicheApifyDatasetStatusParams) => {
    return NicheApifyDatasetStatus.create(data);
};

export const checkCollectionPageInNicheApifyDatasetStatus = (
    data: ICheckCollectionPageAlreadyInNicheApifyDatasetStatusParams,
) => {
    const { nicheId, collectionPageId } = data;
    return NicheApifyDatasetStatus.exists({ nicheId, completedCollectionPages: collectionPageId });
};

export const updateNicheApifyDatasetStatus = (data: IUpdateNicheApifyDatasetStatus) => {
    const { identifier, updateData, options } = data;
    return NicheApifyDatasetStatus.findOneAndUpdate(identifier, updateData, options);
};
