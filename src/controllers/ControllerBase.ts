import * as express from 'express';

export interface IControllerBase {
    initRoutes(): void;
}

export abstract class ControllerBase implements IControllerBase {
    public path: string;
    public router: express.Router = express.Router();

    constructor(path: string) {
        this.path = path;
        this.initRoutes();
    }

    abstract initRoutes(): void;
}