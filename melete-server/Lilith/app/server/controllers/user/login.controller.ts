import { Request, Response } from 'express';
import { UserModel } from '../../../../model/user/user.model';
import { isEmpty } from '../../../../utils/objectFunction';
import { ensuredRequest } from '../../../../utils/ensure-authenticated.middleware';

export function loginUser(request: ensuredRequest, response: Response) {
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
