import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
});

export const User = mongoose.model<IUser>("User", UserSchema);

// Data Dummy (seed data)
export const seedUsers = async () => {
  const users = [
    { username: "admin", password: "1234", role: "Administrator" },
    { username: "operator", password: "1234", role: "Operator" },
  ];
  for (const user of users) {
    const exists = await User.findOne({ username: user.username });
    if (!exists) {
      await User.create(user);
    }
  }
};
