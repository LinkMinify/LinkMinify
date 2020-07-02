import { DomainModel } from '../../models/domain';
import { ControllerBase } from '../ControllerBase';
import { DomainRepository } from '../../repository/DomainRepository';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

class DomainsApiController extends ControllerBase
{
    constructor()
    {
        super('/api/v1/domains');
    }

    public initRoutes(): void {
        this.router.get(this.path, this.all);
        this.router.post(this.path, this.create);
    }

    public async all(req: Request, res: Response) {
        let domains = DomainRepository.getEnabledDomains();

        if (domains == null) {
            res.json({
                success: false,
                result: 'No domains found'
            }).status(500);
        }

        res.json(domains);
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        const { domain } = req.body;

        const validator = yup.object().shape({
            domain: yup.string().required()
        });

        try {
            await validator.validate({
                domain: domain
            })
            
            // finally, save the new domain to the database
            await DomainModel.create({
                domain: domain
            }).then(() => {
                res.json({
                    success: true,
                    result: 'Successfully added domain ' + domain
                });
            }).catch(() => { 
                res.json({
                    success: false,
                    result: `Domain ${domain} already exists.`
                }).status(500);
                //throw new Error(`Domain ${domain} already exists.`); 
            });
        } catch (error) {
            next(error);
            //console.log(error);
        }
    }

}

export default DomainsApiController;