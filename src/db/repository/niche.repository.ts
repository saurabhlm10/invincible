import Niche from '../models/Niche.model';
import {
    ICheckIGPageInNicheParams,
    ICheckNicheExistsParams,
    ICreateNicheParams,
    IGetNicheParams,
} from '../types/Niche.type';

export const checkNicheExists = async (data: ICheckNicheExistsParams) => {
    return Niche.exists(data);
};

export const createNiche = async (data: ICreateNicheParams) => {
    return Niche.create(data);
};

export const getNiche = async (data: IGetNicheParams) => {
    const { nicheId } = data;
    return Niche.findById(nicheId);
};

export const checkIGPageInNiche = async (data: ICheckIGPageInNicheParams) => {
    const { nicheId, pageId } = data;

    return Niche.findOne({ _id: nicheId, pages: pageId });
};
