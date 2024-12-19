import mongoose, { Schema, type Document } from "mongoose";

export interface ItemInterface extends Document {
  name: string;
	amount: string;
	condition: string;
	created_at: Date;
}

const ItemSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: String, required: true },
    condition: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
);

export default mongoose.model<ItemInterface>("Item", ItemSchema);