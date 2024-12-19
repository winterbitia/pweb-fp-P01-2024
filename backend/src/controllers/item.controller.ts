import type { Request, Response } from "express";
import ItemService from "../services/item.service";

export class ItemController {
  async healthCheck(req: Request, res: Response) {
    try { 
      const currentTime = new Date().toLocaleString();
      res.status(200).send({
        status: "success from item controller",
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

  async addItem(req: Request, res: Response) {
    try {
      const item = await ItemService.addItem(req.body);
      res.status(201).json(item);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async getAllItems(req: Request, res: Response) {
    try {
      const items = await ItemService.getAllItems();
      res.status(200).json(items);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async getItemById(req: Request, res: Response) {
    try {
      const item = await ItemService.getItemById(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async updateItem(req: Request, res: Response) {
    try {
      const item = await ItemService.updateItem(req.params.id, req.body);
      res.status(200).json(item);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }

  async deleteItem(req: Request, res: Response) {
    try {
      const item = await ItemService.deleteItem(req.params.id);
      res.status(200).json(item);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'Unknown error' });
      }
    }
  }
}