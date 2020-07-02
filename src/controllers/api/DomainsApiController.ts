import { DomainModel } from '../../models/domain';
import { ControllerBase } from '../ControllerBase';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';

class DomainsApiController extends ControllerBase
{
    constructor()
    {
        super('/api/v1/domains');
    }

    public initRoutes(): void {
        this.router.post(this.path, this.create);
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
                return res.json({
                    success: true,
                    result: 'Successfully added domain ' + domain
                });
            }).catch(() => { 
                throw new Error(`Domain ${domain} already exists.`); 
            });
        } catch (error) {
            return next(error);
            //console.log(error);
        }
    }
}

export default DomainsApiController;