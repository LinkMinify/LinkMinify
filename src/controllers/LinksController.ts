import { ControllerBase } from './ControllerBase';
import { Request, Response, NextFunction } from 'express';
import { LinkRepository } from '../repository/LinkRepository';
import { DomainRepository } from '../repository/DomainRepository';
import { Domain, DomainModel } from '../models/domain';

class LinksController extends ControllerBase {

    constructor() {
        super("/");
    }

    public initRoutes(): void {
        this.router.get('/:slug', this.processSlug);
    }

    public async processSlug(req: Request, res: Response, next: NextFunction) {
        let { slug } = req.params;

        let hostname = req.hostname;

        // attempt to get the link
        let link = await LinkRepository.findBySlug(slug);

        if (link == null) {
            res.status(404).send('Invalid link');
            return;
        }

        // validate the domain
        let domain = link.domain as Domain;

        if (hostname != domain.domain) {
            res.status(404).send("Invalid link");
            return;
        }
        
        // redirect if we made it this far
        res.redirect(link.url);
        next();
    }

}

export default LinksController;