import CollectionIGPage from '../models/CollectionIGPage.model';
import { ICollectionIGPageExistsParams, IGetCollectionIGPageUsingNameParams } from '../types/CollectionIGPage.type';

export const checkCollectionPageExists = async (data: ICollectionIGPageExistsParams) => {
    const { id } = data;

    return CollectionIGPage.exists({ _id: id });
};

export const getCollectionPageUsingName = async (data: IGetCollectionIGPageUsingNameParams) => {
    const { username } = data;

    return CollectionIGPage.findOne({ username });
};
