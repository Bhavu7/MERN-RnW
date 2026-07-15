import { StatusCodes } from 'http-status-codes';
import { itemService } from '../services/itemService.js';
import { successResponse } from '../utils/apiResponse.js';

export const itemController = {
  create: async (req, res) => {
    const item = await itemService.create(req.body, req.user._id);

    res.status(StatusCodes.CREATED).json(
      successResponse({
        message: 'Item created successfully',
        data: item
      })
    );
  },

  list: async (req, res) => {
    const result = await itemService.list(req.query);

    res.status(StatusCodes.OK).json(
      successResponse({
        message: 'Items fetched successfully',
        data: result.items,
        meta: result.meta
      })
    );
  },

  getById: async (req, res) => {
    const item = await itemService.getById(req.params.id);

    res.status(StatusCodes.OK).json(
      successResponse({
        message: 'Item fetched successfully',
        data: item
      })
    );
  },

  update: async (req, res) => {
    const item = await itemService.update(req.params.id, req.body);

    res.status(StatusCodes.OK).json(
      successResponse({
        message: 'Item updated successfully',
        data: item
      })
    );
  },

  remove: async (req, res) => {
    const deletedItem = await itemService.remove(req.params.id);

    res.status(StatusCodes.OK).json(
      successResponse({
        message: 'Item deleted successfully',
        data: deletedItem
      })
    );
  }
};