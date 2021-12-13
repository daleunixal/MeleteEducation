import { Request, Response } from 'express';
import { secretJWT } from '../configuration';
import * as jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { UserPayload } from '../model/user/user.payload';
import { UserModel } from '../model/user/user.model';
import { from, tap } from 'rxjs';
import { mongoose } from '@typegoose/typegoose';

export function ensureAuthenticatedMiddleware(request: Request, response: Response, next: Function){
    if(!request.headers.authorization){
        response.status(401).send({
            error: "JWT Token missing"
        })
    }

    const token = request.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, secretJWT) as UserPayload;

    if(!payload){
        response.status(401).send({
            error: "JWT Token Invalid"
        })
    }

    if(dayjs(payload.expire).isBefore(dayjs())){
        response.status(401).send({
            error: "JWT Token Expired"
        })
    }

    from(UserModel.dataModel.findById(payload.payload.id).exec())
        .pipe(
            tap((value) => {
                if(!value){
                    response.status(401).send({
                        error: "JWT Token Invalid"
                    })

                    return
                }

                (request as ensuredRequest).user = payload.payload
            })
        )
}

export type ensuredRequest = Request & { user: { admin: boolean, id: mongoose.Types.ObjectId } }