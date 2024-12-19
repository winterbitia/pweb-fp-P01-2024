import type { OperatorInterface } from "../models/operator.model";
import Operator from "../models/operator.model";
import { isValidObjectId } from "mongoose";

export class OperatorService{
  async addOperator(operator: OperatorInterface): Promise<OperatorInterface> {
    try {
      const newOperator = new Operator(operator);
      await newOperator.save();
      return newOperator;
    } catch (error) {
      throw error;
    }
  }

  async getAllOperators(): Promise<OperatorInterface[]> {
    try {
      const operators = await Operator.find();
      return operators;
    } catch (error) {
      throw error;
    }
  }

  async getOperatorById(id: string): Promise<OperatorInterface> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid ID");
      }
      const operator = await Operator.findById(id);
      if (!operator) {
        throw new Error("Operator not found");
      }
      return operator;
    } catch (error) {
      throw error;
    }
  }

  async updateOperator(id: string, operator: OperatorInterface): Promise<OperatorInterface> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid ID");
      }
      const updatedOperator = await Operator.findByIdAndUpdate(id, operator, { new: true });
      if (!updatedOperator) {
        throw new Error("Operator not found");
      }
      return updatedOperator;
    } catch (error) {
      throw error;
    }
  }

  async deleteOperator(id: string): Promise<OperatorInterface> {
    try {
      if (!isValidObjectId(id)) {
        throw new Error("Invalid ID");
      }
      const deletedOperator = await Operator.findByIdAndDelete(id);
      if (!deletedOperator) {
        throw new Error("Operator not found");
      }
      return deletedOperator;
    } catch (error) {
      throw error;
    }
  }
}

export default new OperatorService();