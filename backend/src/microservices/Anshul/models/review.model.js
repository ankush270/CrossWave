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
    },
    reviewee_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating:{
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
})

export const Review = mongoose.model('Review', reviewSchema);