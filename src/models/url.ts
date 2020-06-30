import { prop, Typegoose, ModelType, InstanceType, arrayProp } from 'typegoose';

class Url extends Typegoose {
    @prop({ required: true })
    slug: string;

    @prop({ required: true })
    url: string;
}