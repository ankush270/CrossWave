import mongoose, {Schema} from 'mongoose';

const chatSchema = new Schema({
    seller_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    buyer_id:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    messages:[{
        sender:{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        text:{
            type: String,
            required: true
        },
    }]
});

export const Chat = mongoose.model('Chat', chatSchema);