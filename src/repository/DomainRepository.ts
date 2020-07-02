import { RepositoryBase } from './RepositoryBase';
import { Domain, DomainModel } from '../models/domain';
import { DocumentQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';

export class DomainRepository {
    
    public static getEnabledDomains(): DocumentQuery<DocumentType<Domain>[], DocumentType<Domain>, {}> | null {
        let domains = DomainModel.find({ enabled: true });

        // if we didn't find any enabled domains, return null
        if (domains == null) {
            return null;
        }

        return domains;
    }

    public static findByDomain(domainName: string): DocumentQuery<DocumentType<Domain>, DocumentType<Domain>, {}> | null {
        let domain = DomainModel.findOne({ domain: domainName });
        
        // if we didn't find a domain, return null
        if (domain == null) {
            return null;
        }

        return domain;
    }

}