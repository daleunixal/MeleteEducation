import { Request, Response } from 'express';
import { UserModel } from '../../../../model/user/user.model';
import { isEmpty } from '../../../../utils/objectFunction';
import { ensuredRequest } from '../../../../utils/ensure-authenticated.middleware';
import { IUser } from '../../../../model/user/user.interface';
import { from, tap } from 'rxjs';
import * as bcrypt from 'bcrypt';


export function loginUser(request: ensuredRequest, response: Response) {
    if (isEmpty(request.body)) {
        response.status(400).send('Error: Body was empty');

        return;
    }
    const user: IUser = request.body as IUser;
    from(UserModel.getModel().find({username: user.username}).exec())
        .pipe(
            tap((UserList) => {
                if(UserList.length === 0){
                    response.status(204).send({
                        error: "UserNotFound"
                    })

                    return;
                }
                if(ensureSignIn(UserList[0], user.password)){
                    response.status(200).send({
                        token: UserList[0].getToken()
                    })

                    return;
                }
                response.sendStatus(400);
            })
        )
        .subscribe()
}

function ensureSignIn(userModel: UserModel, password: string): boolean {
    try {
        return bcrypt.compareSync(password, userModel.password)
    }
    catch (e) {
        console.error(e)
    }
}
