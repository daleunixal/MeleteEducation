import { Router } from 'express';
import { registerUser } from '../controllers/user/registration.controller';
import { loginUser } from '../controllers/user/login.controller';
import { ensureAuthenticatedMiddleware } from '../../../utils/ensure-authenticated.middleware';
import { userInfoController } from '../controllers/user/user-info.controller';

const _userRouter = Router();


_userRouter.post('/api/v1/profile/register', registerUser)
_userRouter.post('/api/v1/profile/login', loginUser)
_userRouter.get('/api/v1/profile/info', ensureAuthenticatedMiddleware, userInfoController)


export const UserRoutes = _userRouter
