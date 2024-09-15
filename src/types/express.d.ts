import { User } from '../models/userModel'
import { Request } from 'express';

declare namespace Express {
    export interface Request {
        user: User
    }
}