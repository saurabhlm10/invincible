import IGPageModel from '../models/IGPage.model';
import { ICheckIGPageExistsParams } from '../types/IGPage.type';

export const checkIGPageExists = async (data: ICheckIGPageExistsParams) => {
    const { id } = data;
    return IGPageModel.exists({ _id: id });
};
