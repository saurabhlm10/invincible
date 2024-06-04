import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { connectToDB } from '../config/db.config';
import { checkNicheExists } from '../repository/niche.repository';
import {
    createNicheApifyDatasetStatus,
    getNicheApifyDatasetStatus,
} from '../repository/nicheApifyDatasetStatus.repository';
import { errorHandler } from '../utils/errorHandler.util';
import { successReturn } from '../utils/successReturn.util';
import CustomError from '../utils/CustomError.util';

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        await connectToDB();
        const data = JSON.parse(event.body || '');

        const { nicheId, datasetId } = data as { nicheId: string; datasetId: string };

        // Validate Niche
        const niche = await checkNicheExists({ _id: nicheId });

        if (!niche) throw new CustomError('Niche not valid', 400);

        // Find already exists
        const exists = await getNicheApifyDatasetStatus({ datasetId });

        if (exists) throw new CustomError('NicheApifyDatasetStatus already exists', 400);

        const createdNicheApifyDatasetStatus = await createNicheApifyDatasetStatus(data);

        return successReturn('Niche created successfully', createdNicheApifyDatasetStatus);
    } catch (err) {
        return errorHandler(err);
    }
};
