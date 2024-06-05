import mongoose, { Schema } from 'mongoose';

export enum NicheApifyDatasetStatusEnum {
    INITIATED = 'INITIATED',
    COMPLETED = 'COMPLETED',
}

const nicheApifyDatasetStatusSchema = new mongoose.Schema(
    {
        nicheId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        datasetId: {
            type: String,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            enum: NicheApifyDatasetStatusEnum,
            required: true,
            default: NicheApifyDatasetStatusEnum.INITIATED,
        },
        completedCollectionPages: {
            type: [Schema.Types.ObjectId],
            required: true,
            default: [],
            ref: 'CollectionIGPage',
        },
    },
    {
        timestamps: true,
    },
);

const NicheApifyDatasetStatus = mongoose.model('NicheApifyDatasetStatus', nicheApifyDatasetStatusSchema);

export default NicheApifyDatasetStatus;
