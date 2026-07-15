import { Item } from '../models/Item.js';

export const itemRepository = {
  create: (payload) => Item.create(payload),
  findById: (id) => Item.findById(id),
  findOne: (filter) => Item.findOne(filter),
  findMany: ({ filter, sort, skip, limit }) => Item.find(filter).sort(sort).skip(skip).limit(limit).populate('createdBy', 'name email role'),
  count: (filter) => Item.countDocuments(filter),
  updateById: (id, payload) => Item.findByIdAndUpdate(id, payload, { new: true, runValidators: true }),
  deleteById: (id) => Item.findByIdAndDelete(id),
  upsertBySourceId: (sourceId, payload) => Item.findOneAndUpdate({ sourceId }, payload, { new: true, upsert: true, setDefaultsOnInsert: true }),
  distinctCategories: () => Item.distinct('category')
};
