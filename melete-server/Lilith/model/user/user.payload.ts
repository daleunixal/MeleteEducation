import * as mongoose from 'mongoose';

export interface UserPayload {
    payload: {
        admin: boolean,
        id: mongoose.Types.ObjectId
    },
    expire: number
}
