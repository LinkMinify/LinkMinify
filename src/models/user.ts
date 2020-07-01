import { prop, index, getModelForClass } from '@typegoose/typegoose';

@index({ username: 1, email: 1 }, { unique: true })
export class User {
    @prop({ required: true })
    username: string;

    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;

    @prop({ default: false })
    locked: boolean;

    @prop()
    lockedReason?: string;

    @prop({ default: Date.now })
    createdAt: Date;

    @prop({ default: Date.now })
    updatedAt: Date;
}

export const UserModel = getModelForClass(User);
