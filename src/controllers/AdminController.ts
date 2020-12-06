import { NextFunction, Request, Response, Router } from 'express';
export const AdminController: Router = Router();
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import { create_table_users } from '../repository/tables';
import { insert_user, verify_password } from '../repository/db';
import { authenticateMiddleware } from '../repository/authentication';

AdminController.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).send({ data: 'Pong!' });
    } catch (e) {
        next(e);
    }
});

AdminController.post('/register', (req: Request, res: Response) => {
    create_table_users();
    if (req.body.username && req.body.password) {
        const pwd = req.body.password;
        const hash = crypto.createHash('sha256').update(pwd).digest('hex');
        console.log(hash);
        insert_user(req.body.username, hash);
    }
    res.send(req.query);
});

AdminController.get('/login', async (req: Request, res: Response) => {
    if (req.body.username && req.body.password) {
        try {
            const correctPassword = await verify_password(req.body.username, req.body.password);
            const token = await jwt.sign({ user: req.body.username }, 'xxx', { expiresIn: '1h' });
            res.json({ token: token });
        } catch (error) {
            res.send('Wrong pass');
        }
    }
});

AdminController.get('/test', authenticateMiddleware, (req: Request, res: Response) => {
    res.json({ user: (req as any).user });
});
