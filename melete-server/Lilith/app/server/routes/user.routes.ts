import { Router } from 'express';
import { registerUser } from '../controllers/user/registration.controller';

const _userRouter = Router();


_userRouter.post('/api/v1/register', registerUser)


export const UserRoutes = _userRouter
