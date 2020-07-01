import { prop, getModelForClass, index } from '@typegoose/typegoose';

@index({ domain: 1 }, { unique: true })
export class Domain {
    @prop({ required: true })
    domain: string;

    @prop({ default: true })
    enabled: boolean;

    @prop({ default: Date.now })
    createdAt: Date;

    @prop({ default: Date.now })
    updatedAt: Date;
}

export const DomainModel = getModelForClass(Domain);

