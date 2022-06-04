import { prop, index, getModelForClass, Ref } from '@typegoose/typegoose';
import * as mongoose from 'mongoose';
import { User } from './user';
import { Domain } from './domain';

export class LinkClicks {
    public date: Date;
    public clicks: number;
}

@index({ slug: 1 }, { unique: true })
export class Link {
    @prop({ ref: () => Domain })
    public domain: Ref<Domain>;

    @prop({ required: true })
    public slug: string;

    @prop({ required: true })
    public url: string;

    @prop({ type: () => LinkClicks })
    public link_clicks?: LinkClicks[];

    @prop({ ref: () => User })
    public createdBy?: Ref<User>;

    @prop({ default: Date.now })
    public createdAt?: Date;

    @prop({ default: Date.now })
    public updatedAt?: Date;
}

export const LinkModel = getModelForClass(Link, {
    existingMongoose: mongoose,
    schemaOptions: {
        collection: 'links'
    }
});