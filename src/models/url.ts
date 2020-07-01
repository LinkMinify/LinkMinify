import { prop, index, getModelForClass } from '@typegoose/typegoose';

export class LinkClicks {
    date: Date;
    clicks: number;
}

@index({ slug: 1 }, { unique: true })
export class Url {
    @prop({ required: true })
    slug: string;

    @prop({ required: true })
    url: string;

    @prop()
    link_clicks: LinkClicks[];
}

export const UrlModel = getModelForClass(Url);