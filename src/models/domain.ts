import { prop, getModelForClass, index } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';

@index({ domain: 1 }, { unique: true })
export class Domain {
    @prop({ required: true })
    public domain: string;

    @prop({ default: true })
    public enabled?: boolean;

    @prop({ default: new Date() })
    public createdAt?: Date;

    @prop({ default: new Date() })
    public updatedAt?: Date;
}

export const DomainModel = getModelForClass(Domain, {
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'domains'
    }
});

