import { prop, getModelForClass, index } from '@typegoose/typegoose';

@index({ domain: 1 }, { unique: true })
export class Domain {
    @prop({ required: true })
    public domain: string;

    @prop({ default: true })
    public enabled?: boolean;

    @prop({ default: Date.now })
    public createdAt?: Date;

    @prop({ default: Date.now })
    public updatedAt?: Date;
}

export const DomainModel = getModelForClass(Domain);

