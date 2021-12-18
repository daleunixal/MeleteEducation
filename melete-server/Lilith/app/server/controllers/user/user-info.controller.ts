import { ensuredRequest } from '../../../../utils/ensure-authenticated.middleware';
import { Response } from 'express';
import { UserModel } from '../../../../model/user/user.model';
import { from, tap } from 'rxjs';
import { HydratedDocument } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose/lib/types';

export function userInfoController(request: ensuredRequest, response: Response) {
    from(UserModel.getModel().findById(request.user.id).exec()).pipe(
        tap((value: HydratedDocument<DocumentType<UserModel>>) => {
            response.status(200).send({
                isValid: true,
                fullname: value.fullname
            })
        })
    ).subscribe()
}
