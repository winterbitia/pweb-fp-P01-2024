import mongoose, { Schema, type Document } from "mongoose";

export interface OperatorInterface extends Document {
  name: string;
}

const OperatorSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
  },
);

export default mongoose.model<OperatorInterface>("Operator", OperatorSchema);
