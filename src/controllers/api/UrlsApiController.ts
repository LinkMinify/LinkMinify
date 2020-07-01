import { ControllerBase } from '../ControllerBase';
import { Request, Response } from 'express';


class UrlsApiController extends ControllerBase
{
    constructor()
    {
        super('/api/v1/urls');
    }

    public initRoutes(): void {
        
    }

    public shorten(req: Request, res: Response) {
        
    }
}