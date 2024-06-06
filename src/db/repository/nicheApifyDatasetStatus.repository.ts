import NicheApifyDatasetStatus from '../models/NicheApifyDatasetDetails.model';
import {
    ICheckCollectionPageAlreadyInNicheApifyDatasetStatusParams,
    ICreateNicheApifyDatasetStatusParams,
    IGetNicheApifyDatasetStatusParams,
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
