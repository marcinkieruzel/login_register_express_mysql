import { Application, Router } from 'express';
import { PingController } from './controllers/PingController';
import { IndexController } from './controllers/IndexController';
import { AdminController } from './controllers/AdminController';

const _routes: [string, Router][] = [
    ['/', IndexController],
    ['/ping', PingController],
    ['/admin', AdminController],
];

export const routes = (app: Application) => {
    _routes.forEach((route) => {
        const [url, controller] = route;
        app.use(url, controller);
    });
};
