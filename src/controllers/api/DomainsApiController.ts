import { DomainModel } from '../../models/domain';
import { ControllerBase } from '../ControllerBase';
import { DomainRepository } from '../../repository/DomainRepository';
import { Request, Response, NextFunction } from 'express';
import * as yup from 'yup';
import { domain } from 'process';

class DomainsApiController extends ControllerBase
{
    constructor()
    {
        super('/api/v1/domains');
    }

    public initRoutes(): void {
        this.router.get(this.path, this.all);
        this.router.post(this.path, this.create);
        this.router.post(this.path + '/disable', this.disable);
        this.router.post(this.path + '/enable', this.enable);
    }

    public async all(req: Request, res: Response, next: NextFunction) {
        try {
            let domains = await DomainRepository.getEnabledDomains();

            if (domains == null) {
                throw new Error('No domains found.');
            }

            let enabledDomains = [];
            domains.forEach((domain) => {
                enabledDomains.push(domain.domain);
            });

            res.json({
                success: true,
                domains: enabledDomains
            });
        } catch(error) {
            next(error);
        }
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
                throw new Error(`Domain ${domain} already exists.`); 
            });
        } catch (error) {
            next(error);
            //console.log(error);
        }
    }

    public async disable(req: Request, res: Response, next: NextFunction) {
        const { domain } = req.body;

        const validator = yup.object().shape({
            domain: yup.string().required()
        });

        try {
            await validator.validate({
                domain: domain
            })

            let document = await DomainRepository.findByDomain(domain); 

            if (document == null) {
                throw new Error("Invalid domain.");
            }

            document.enabled = false;
            document.updatedAt = new Date();
            
            // update document in mongodb
            await DomainRepository.update(domain);
        } catch (error) {
            next(error);
        }
    }

    public async enable(req: Request, res: Response, next: NextFunction) {
        const { domain } = req.body;

        const validator = yup.object().shape({
            domain: yup.string().required()
        });

        try {
            await validator.validate({
                domain: domain
            })

            let document = await DomainRepository.findByDomain(domain); 

            if (document == null) {
                throw new Error("Invalid domain.");
            }

            document.enabled = true;
            document.updatedAt = new Date();
            
            // update document in mongodb
            await DomainRepository.update(domain);
        } catch (error) {
            next(error);
        }
    }

}

export default DomainsApiController;