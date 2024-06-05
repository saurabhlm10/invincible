import CollectionIGPage from '../models/CollectionIGPage.model';
import { ICollectionIGPageExistsParams } from '../types/CollectionIGPage.type';

export const checkCollectionPageExists = async (data: ICollectionIGPageExistsParams) => {
    const { id } = data;

    return CollectionIGPage.exists({ _id: id });
};
