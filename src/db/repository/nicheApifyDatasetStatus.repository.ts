import NicheApifyDatasetStatus from '../models/NicheApifyDatasetDetails.model';
import {
    ICheckCollectionPageAlreadyInNicheApifyDatasetStatusParams,
    ICreateNicheApifyDatasetStatusParams,
    IGetNicheApifyDatasetStatusParams,
} from '../types/NicheApifyDatasetStatus.type';

export const getNicheApifyDatasetStatus = (data: IGetNicheApifyDatasetStatusParams) => {
    const { datasetId } = data;

    return NicheApifyDatasetStatus.findOne({ datasetId });
};

export const createNicheApifyDatasetStatus = (data: ICreateNicheApifyDatasetStatusParams) => {
    return NicheApifyDatasetStatus.create(data);
};

export const checkCollectionPageInNicheApifyDatasetStatus = (
    data: ICheckCollectionPageAlreadyInNicheApifyDatasetStatusParams,
) => {
    const { datasetId, collectionPageId } = data;
    return NicheApifyDatasetStatus.exists({ datasetId, completedCollectionPages: collectionPageId });
};
