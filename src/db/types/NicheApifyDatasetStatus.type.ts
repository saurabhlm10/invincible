export interface IGetNicheApifyDatasetStatusParams {
    datasetId: string;
}

export interface ICreateNicheApifyDatasetStatusParams {
    nicheId: string;
    datasetId: string;
}

export interface ICheckCollectionPageAlreadyInNicheApifyDatasetStatusParams {
    datasetId: string;
    collectionPageId: string;
}
