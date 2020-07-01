import { prop, index, getModelForClass } from '@typegoose/typegoose';

@index({ username: 1, email: 1 }, { unique: true })
export class User {
    @prop({ required: true })
    public username: string;

    @prop({ required: true })
    public email: string;

    @prop({ required: true })
    public password: string;

    @prop({ default: false })
    public locked: boolean;

    @prop()
    public lockedReason?: string;

    @prop({ default: Date.now })
    public createdAt: Date;

    @prop({ default: Date.now })
    public updatedAt: Date;
}

export const UserModel = getModelForClass(User);
