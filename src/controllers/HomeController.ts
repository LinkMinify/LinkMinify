import { ControllerBase } from './ControllerBase';
import { Request, Response } from 'express';

class HomeController extends ControllerBase {
    constructor() {
        super("/");
    }

    public initRoutes() {
        this.router.get('/', this.index);
    }

    public index(req: Request, res: Response) {
        res.json({ message: "I'm alive" });
    }
}

export default HomeController;