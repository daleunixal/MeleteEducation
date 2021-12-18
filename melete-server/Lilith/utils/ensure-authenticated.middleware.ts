import { Request, Response } from 'express';
import { secretJWT } from '../configuration';
import * as jwt from 'jsonwebtoken';
import dayjs from 'dayjs';
import { UserPayload } from '../model/user/user.payload';
import { UserModel } from '../model/user/user.model';
import { from, tap } from 'rxjs';
import { mongoose } from '@typegoose/typegoose';
import { HydratedDocument } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';

export function ensureAuthenticatedMiddleware(request: Request, response: Response, next: Function){
    if(!request.headers.authorization){
        response.status(401).send({
            error: "JWT Token missing",
            isValid: false
        })
    }

    const token = request.headers.authorization.split(' ')[1];

    const payload = jwt.verify(token, secretJWT) as UserPayload;

    if(!payload){
        response.status(401).send({
            error: "JWT Token Invalid",
            isValid: false
        })

        return;
    }


    if(dayjs.unix(payload.expire).isBefore(dayjs())){
        response.status(401).send({
            error: "JWT Token Expired",
            isValid: false
        })

        return
    }

    from(UserModel.getModel().findById(payload.payload.id).exec())
        .pipe(
            tap((value) => {
                if(!value){
                    response.status(401).send({
                        error: "JWT Token Invalid",
                        isValid: false
                    })

                    return
                }

                (request as ensuredRequest).user = payload.payload
                next()
            })
        ).subscribe()
}

export type ensuredRequest = Request & { user: { admin: boolean, id: mongoose.Types.ObjectId } }
