export interface ICheckNicheExistsParams {
    _id?: string;
    name?: string;
}

export interface ICreateNicheParams {
    name: string;
}

export interface IGetNicheParams {
    nicheId: string;
}

export interface ICheckIGPageInNicheParams {
    nicheId: string;
    pageId: string;
}
