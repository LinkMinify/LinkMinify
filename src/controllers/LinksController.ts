import { ControllerBase } from './ControllerBase';
import { Request, Response, NextFunction } from 'express';

class LinksController extends ControllerBase {

    constructor() {
        super("/");
    }

    public initRoutes(): void {
        this.router.get('/:slug', this.processSlug);
    }

    public async processSlug(req: Request, res: Response, next: NextFunction) {
        console.log(req.hostname);
        next();
    }

}

export default LinksController;