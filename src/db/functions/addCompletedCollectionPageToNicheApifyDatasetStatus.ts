import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { connectToDB } from '../config/db.config';
import { errorHandler } from '../utils/errorHandler.util';
import { successReturn } from '../utils/successReturn.util';
import CustomError from '../utils/CustomError.util';
import { validate } from '../validator';
import {
    checkCollectionPageInNicheApifyDatasetStatus,
    getNicheApifyDatasetStatus,
} from '../repository/nicheApifyDatasetStatus.repository';
import { checkCollectionPageExists } from '../repository/collectionIGPage.repository';
import NicheApifyDatasetStatus from '../models/NicheApifyDatasetDetails.model';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        await connectToDB();

        const body = JSON.parse(event.body || '');

        const { datasetId, collectionPageId } = body as { datasetId: string; collectionPageId: string };

        validate('datasetId', datasetId);
        validate('collectionPageId', collectionPageId, true);

        // Check NicheApifyDatasetStatusExists
        const nicheApifyDatasetStatusExists = await getNicheApifyDatasetStatus({ datasetId });
        if (!nicheApifyDatasetStatusExists) throw new CustomError('NicheApifyDatasetStatus not found', 404);

        // Check Collection Page Exists
        const collectionPageExists = await checkCollectionPageExists({ id: collectionPageId });
        if (!collectionPageExists) throw new CustomError('Collection Page not found', 404);

        const checkCollectionPageAlreadyInNicheApifyDatasetStatus = await checkCollectionPageInNicheApifyDatasetStatus({
            datasetId,
            collectionPageId,
        });
        if (checkCollectionPageAlreadyInNicheApifyDatasetStatus)
            return successReturn(`Collection Page ${collectionPageId} already in NicheApifyDatasetStatus `);

        const updatedNicheApifyDatasetStatus = await NicheApifyDatasetStatus.findOneAndUpdate(
            { datasetId },
            { $push: { completedCollectionPages: collectionPageId } },
            { new: true },
        );

        return successReturn(`Added Collection Page ${collectionPageId} successfully`, updatedNicheApifyDatasetStatus);
    } catch (error) {
        return errorHandler(error);
    }
};
