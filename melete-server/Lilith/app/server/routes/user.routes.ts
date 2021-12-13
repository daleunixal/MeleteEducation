import { Router } from 'express';
import { registerUser } from '../controllers/user/registration.controller';
import { loginUser } from '../controllers/user/login.controller';

const _userRouter = Router();


_userRouter.post('/api/v1/register', registerUser)
_userRouter.get('/api/v1/login', loginUser)


export const UserRoutes = _userRouter
