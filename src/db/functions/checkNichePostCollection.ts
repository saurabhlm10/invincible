import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { errorHandler } from '../utils/errorHandler.util';
import { connectToDB } from '../config/db.config';
import { validate } from '../validator';
import CollectionIGPage from '../models/CollectionIGPage.model';
import NicheApifyDatasetStatus from '../models/NicheApifyDatasetDetails.model';
import CustomError from '../utils/CustomError.util';
import { successReturn } from '../utils/successReturn.util';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        await connectToDB();

        const data = event.pathParameters;

        const { nicheId } = data as { nicheId: string };

        validate('nicheId', nicheId, true);

        // Get NicheApifyDatasetStatus
        const nicheApifyDatasetStatus = await NicheApifyDatasetStatus.findOne({ nicheId });

        if (!nicheApifyDatasetStatus) throw new CustomError(`NicheApifyDatasetStatus ${nicheId} not found`, 404);

        // Get All Niche Collection Pages
        const nicheCollectionPages = await CollectionIGPage.find({ nicheId });

        let message = 'Niche Collection Not Completed';
        let completed = false;

        // Compare
        if (nicheApifyDatasetStatus.completedCollectionPages.length === nicheCollectionPages.length) {
            message = 'Niche Collection Completed';
            completed = true;
        }
        return successReturn('Got Niche Completed Status Successfully', { message, completed });
        // Send Response
    } catch (error) {
        return errorHandler(error);
    }
};
