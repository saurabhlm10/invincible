import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { errorHandler } from '../utils/errorHandler.util';
import { connectToDB } from '../config/db.config';
import { successReturn } from '../utils/successReturn.util';
import { checkNicheExists } from '../repository/niche.repository';
import CustomError from '../utils/CustomError.util';
import { validate } from '../validator';
import RawPost from '../models/RawPost.model';
import NicheApifyDatasetStatus, { NicheApifyDatasetStatusEnum } from '../models/NicheApifyDatasetDetails.model';

interface CreateTempPostsBody {
    nicheId: string;
    posts: TempPostItem[];
}

interface TempPostItem {
    source_url: string;
    originalViews: number;
    source: string;
    nicheId: string;
    video_url: string;
    media_url: string;
    cover_url: string;
    caption: string;
}

export const lambdaHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    try {
        await connectToDB();

        const data = JSON.parse(event.body || '') as CreateTempPostsBody;

        const { nicheId, posts } = data;

        validate('nicheId', nicheId, true);

        // Check Niche Valid
        const nicheExists = await checkNicheExists({ _id: nicheId });

        if (!nicheExists) throw new CustomError('Niche not found', 404);

        const insertBody = posts.map((item) => {
            return {
                ...item,
                originalViews: Number(item.originalViews),
                nicheId,
            };
        });

        // Total errors
        let insertionErrorCount = 0;
        // Duplicate key errors
        let duplicateErrorCount = 0;

        await RawPost.insertMany(insertBody, { ordered: false }).catch((error: any) => {
            console.error('Error inserting documents:', error);
            insertionErrorCount = error.results.length;
            duplicateErrorCount = error.writeErrors.filter((err: any) => err.err.code === 11000).length;
        });

        let successMessage = 'TempPosts created successfully';

        if (insertionErrorCount && insertionErrorCount === duplicateErrorCount)
            successMessage = `TempPosts created successfully, except ${duplicateErrorCount} duplicates out of ${posts.length}`;
        else if (insertionErrorCount && insertionErrorCount !== duplicateErrorCount) {
            successMessage = `Encountered ${insertionErrorCount - duplicateErrorCount} document errors out of ${
                posts.length
            } documents`;
        }

        // Update NicheApifyDatasetStatus
        await NicheApifyDatasetStatus.findOneAndUpdate({ nicheId }, { status: NicheApifyDatasetStatusEnum.COMPLETED });

        return successReturn(successMessage);
    } catch (error) {
        return errorHandler(error);
    }
};
