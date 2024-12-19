import type { Request, Response } from "express";
import OperatorService from "../services/operator.service";

export class OperatorController {
  async healthCheck(req: Request, res: Response) {
    try { 
      const currentTime = new Date().toLocaleString();
      res.status(200).send({
        status: "success from operator controller",
        date: currentTime,
      });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async addOperator(req: Request, res: Response) {
    try {
      const operator = await OperatorService.addOperator(req.body);
      res.status(201).json(operator);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async getAllOperators(req: Request, res: Response) {
    try {
      const operators = await OperatorService.getAllOperators();
      res.status(200).json(operators);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async getOperatorById(req: Request, res: Response) {
    try {
      const operator = await OperatorService.getOperatorById(req.params.id);
      res.status(200).json(operator);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async updateOperator(req: Request, res: Response) {
    try {
      const operator = await OperatorService.updateOperator(req.params.id, req.body);
      res.status(200).json(operator);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async deleteOperator(req: Request, res: Response) {
    try {
      const operator = await OperatorService.deleteOperator(req.params.id);
      res.status(200).json(operator);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
}
