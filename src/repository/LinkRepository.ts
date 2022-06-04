import { Link, LinkModel } from '../models/link';
import { DocumentType } from '@typegoose/typegoose';
import { DomainModel } from '../models/domain';

export class LinkRepository {

    public static findBySlug(slug: string): Promise<DocumentType<Link>> | null {
        let document = LinkModel.findOne({ slug: slug })
            .populate({ path: 'domain', model: DomainModel })
            .exec();

        // if we didn't find a link, return null
        if (document == null) {
            return null;
        }

        return document;
    }

} 