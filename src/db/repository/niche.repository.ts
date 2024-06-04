import Niche from '../models/Niche.model';
import { ICheckNicheExistsParams, ICreateNicheParams, IGetNicheParams } from '../types/Niche.type';

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
