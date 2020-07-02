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
            domain: yup.string().required(),
            createdAt: yup.date().default(() => {
                return new Date();
            }),
            updatedAt: yup.date().default(() => {
                return new Date();
            })
        });

        try {
            await validator.validate({
                domain: domain
            }).then(async (valid) => {    
            
                // finally, save the new domain to the database
                let document = await DomainModel.create({
                    domain: valid.domain,
                    createdAt: valid.createdAt,
                    updatedAt: valid.updatedAt
                }).then(() => {
                    return res.json({
                        success: true,
                        result: 'Successfully added domain ' + domain
                    });
                }).catch(() => { 
                    throw new Error(`Domain ${valid.domain} already exists.`); 
                });
            });            
        } catch (error) {
            next(error);
            //console.log(error);
        }
    }
}

export default DomainsApiController;