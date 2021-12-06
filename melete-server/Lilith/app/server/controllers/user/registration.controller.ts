import { isEmpty } from '../../../../utils/objectFunction';
import { UserModel } from '../../../../model/user/user.model';
import { IUser } from '../../../../model/user/user.interface';
import { Request, Response } from 'express';

export function registerUser(request: Request<UserModel, any, IUser>, response: Response) {
    if (isEmpty(request.body)) {
        response.status(400).send('Error: Body was empty');

        return;
    }
    const user: UserModel = new UserModel(request.body);
    user.saveModel(true).subscribe(
        {
            next: (value) => {
                if (value) {
                    response.sendStatus(201)

                    return
                }
                response.sendStatus(400);
            }
            ,
            error: (error) => {
                response.sendStatus(400);
            }
        })
}
