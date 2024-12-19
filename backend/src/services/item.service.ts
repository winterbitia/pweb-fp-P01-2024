import type { ItemInterface } from "../models/item.model";
import Item from "../models/item.model";
import { isValidObjectId } from "mongoose";

export class ItemService {
  async addItem(item: ItemInterface): Promise<ItemInterface> {
    try {
      const newItem = new Item(item);
      await newItem.save();
      return newItem;
    } catch (error) {
      throw error;
    }
  }

  async getAllItems(): Promise<ItemInterface[]> {
    try {
      const items = await Item.find();
      return items;
    } catch (error) {
      throw error;
    }
  }

  async getItemById(id: string): Promise<ItemInterface> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid ID");
      }
      const item = await Item.findById(id);
      if (!item) {
        throw new Error("Item not found");
      }
      return item;
    } catch (error) {
      throw error;
    }
  }

  async updateItem(id: string, item: ItemInterface): Promise<ItemInterface> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid ID");
      }
      const updatedItem = await Item.findByIdAndUpdate(id, item, { new: true });
      if (!updatedItem) {
        throw new Error("Item not found");
      }
      return updatedItem;
    } catch (error) {
      throw error;
    }
  }

  async deleteItem(id: string): Promise<ItemInterface> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid ID");
      }
      const deletedItem = await Item.findByIdAndDelete(id);
      if (!deletedItem) {
        throw new Error("Item not found");
      }
      return deletedItem;
    } catch (error) {
      throw error;
    }
  }
}

export default new ItemService();