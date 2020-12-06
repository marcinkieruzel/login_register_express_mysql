import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const authenticateMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, 'xxx', (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        console.log(user);
        (req as any).user = user;
        next();
    });
};

export { authenticateMiddleware };
