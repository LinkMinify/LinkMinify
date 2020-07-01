import { prop, index, getModelForClass } from '@typegoose/typegoose';

export class LinkClicks {
    public date: Date;
    public clicks: number;
}

@index({ slug: 1 }, { unique: true })
export class Url {
    @prop({ required: true })
    public slug: string;

    @prop({ required: true })
    public url: string;

    @prop()
    public link_clicks: LinkClicks[];
}

export const UrlModel = getModelForClass(Url);