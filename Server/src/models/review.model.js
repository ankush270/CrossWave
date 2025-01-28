import mongoose, {Schema} from 'mongoose';

const reviewSchema = new Schema({
    reviewer_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description:{
        type: String,
        required: true
    }
})

export const Review = mongoose.model('Review', reviewSchema);