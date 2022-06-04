import { Domain, DomainModel } from '../models/domain';
import { DocumentType } from '@typegoose/typegoose';

export class DomainRepository {
    
    public static getEnabledDomains(): Promise<DocumentType<Domain>[]> | null {
        let domains = DomainModel.find({ enabled: true }).exec();

        // if we didn't find any enabled domains, return null
        if (domains == null) {
            return null;
        }

        return domains;
    }

    public static findByDomain(domain: string): Promise<DocumentType<Domain>> | null {
        let document = DomainModel.findOne({ domain: domain }).exec();
        
        // if we didn't find a domain, return null
        if (document == null) {
            return null;
        }

        return document;
    }

    public static findById(id: string): Promise<DocumentType<Domain>> | null {
        let document = DomainModel.findById(id).exec();
        
        // if we didn't find a domain, return null
        if (document == null) {
            return null;
        }

        return document;
    }

    public static update(domain: Domain) {
        DomainModel.updateOne({ domain: domain.domain }, domain).exec();
    }
}