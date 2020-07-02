import { RepositoryBase } from './RepositoryBase';
import { Domain, DomainModel } from '../models/domain';
import { DocumentQuery } from 'mongoose';
import { DocumentType } from '@typegoose/typegoose';

class DomainRepository {
    
    public findByDomain(domainName: string): DocumentQuery<DocumentType<Domain>, DocumentType<Domain>, {}> | null {
        let domain = DomainModel.findOne({ domain: domainName });
        
        // if we didn't find a domain, return null
        if (domain == null) {
            return null;
        }

        return domain;
    }

}