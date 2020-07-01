import { DomainModel } from '../../models/domain';
import { ControllerBase } from '../ControllerBase';
import { Request, Response } from 'express';
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

    public async create(req: Request, res: Response) {
        const { domain } = req.body;

        const validator = yup.object().shape({
            domain: yup.string().required(),
            createdAt: yup.date().default(() => {
                return Date.now
            }),
            updatedAt: yup.date().default(() => {
                return Date.now
            })
        });

        try {
            await validator.validate({
                domain: domain
            });
        } catch (error) {
            console.log(error);
        }

        // finally, save the new domain to the database
        const domainModel = new DomainModel({ 
            domain: domain,
        });

        await domainModel.save();
    }
}

export default DomainsApiController;