import { Document, Schema, model } from "mongoose";

export interface IUser extends Document {
  username: string;
  role: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>("User", UserSchema);

export default User;