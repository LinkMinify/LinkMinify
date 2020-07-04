import { Link } from './../../models/link';
import { ControllerBase } from '../ControllerBase';
import { Request, Response, NextFunction } from 'express';
import { Link, LinkClicks, LinkModel } from '../../models/link';
import { Domain, DomainModel } from '../../models/domain';
import { User, UserModel } from '../../models/user';
import { DomainRepository } from '../../repository/DomainRepository';
import * as yup from 'yup';
import { nanoid } from 'nanoid';

class LinksApiController extends ControllerBase
{
    constructor()
    {
        super('/api/v1/links');
    }

    public initRoutes(): void {
        this.router.post(`${this.path}/shorten`, this.shorten);
    }

    public async shorten(req: Request, res: Response, next: NextFunction) 
    {
        let { domain, slug, url } = req.body;

        const validator = yup.object().shape({
            domain: yup.string().trim(),
            slug: yup.string().trim().matches(/^[\w\-]+$/i),
            url: yup.string().trim().url().required(),
        });

        try {
            await validator.validate({
                domain: domain,
                slug: slug,
                url: url
            });

            // if no domain, default to minify.sh
            if (!domain) {
                domain = 'minify.sh';
            }

            // if no slug, create one with nanoid
            if (!slug) {
                slug = nanoid(8);
            }

            // make sure domain exists in db
            let domainDocument = await DomainRepository.findByDomain(domain);

            if (domainDocument == null) {
                throw new Error('Invalid domain provided.');
            }
            
            await LinkModel.create({
                domain: domainDocument._id,
                slug: slug,
                url: url
            }).then((link) => {
                res.json({
                    success: true,
                    link
                });
            }).catch(() => {
                throw new Error('An unknown error occured while attempting ' +
                'to shorten the provided link.');
            })

        } catch (error) {
            next(error);
        }
    }
}

export default LinksApiController;