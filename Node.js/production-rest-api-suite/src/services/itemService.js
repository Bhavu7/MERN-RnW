import { StatusCodes } from 'http-status-codes';
import { itemRepository } from '../repositories/itemRepository.js';
import { ApiError } from '../utils/ApiError.js';
import { buildItemQuery } from '../utils/queryFeatures.js';

const normalizeItemPayload = (payload) => ({
  title: payload.title,
  price: Number(payload.price),
  description: payload.description,
  image: payload.image,
  category: payload.category
});

const normalizePartialItemPayload = (payload) => {
  const fields = {};
  if (payload.title !== undefined) fields.title = payload.title;
  if (payload.price !== undefined) fields.price = Number(payload.price);
  if (payload.description !== undefined) fields.description = payload.description;
  if (payload.image !== undefined) fields.image = payload.image;
  if (payload.category !== undefined) fields.category = payload.category;
  return fields;
};

export const itemService = {
  create: async (payload, userId) => {
    const item = await itemRepository.create({
      ...normalizeItemPayload(payload),
      createdBy: userId
    });
    return item;
  },

  list: async (query) => {
    const { filter, pagination, sort } = buildItemQuery(query);
    const [items, total] = await Promise.all([
      itemRepository.findMany({ filter, sort, skip: pagination.skip, limit: pagination.limit }),
      itemRepository.count(filter)
    ]);

    return {
      items,
      meta: {
        page: pagination.page,
        limit: pagination.limit,
        total,
        totalPages: Math.ceil(total / pagination.limit)
      }
    };
  },

  getById: async (id) => {
    const item = await itemRepository.findById(id);
    if (!item) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found');
    }
    return item;
  },

  update: async (id, payload) => {
    const item = await itemRepository.updateById(id, normalizePartialItemPayload(payload));
    if (!item) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found');
    }
    return item;
  },

  remove: async (id) => {
    const item = await itemRepository.deleteById(id);
    if (!item) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Item not found');
    }
    return item;
  }
};
