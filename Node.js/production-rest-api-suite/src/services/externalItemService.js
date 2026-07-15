import { StatusCodes } from 'http-status-codes';
import { externalApiClient } from '../config/axios.js';
import { itemRepository } from '../repositories/itemRepository.js';
import { ApiError } from '../utils/ApiError.js';

export const externalItemService = {
  syncItems: async (userId) => {
    const response = await externalApiClient.get('');
    if (!Array.isArray(response.data)) {
      throw new ApiError(StatusCodes.BAD_GATEWAY, 'Unexpected response from third-party API');
    }

    const syncedItems = [];
    for (const externalItem of response.data) {
      const payload = {
        title: externalItem.title,
        description: externalItem.description,
        price: externalItem.price,
        category: externalItem.category,
        image: externalItem.image,
        rating: {
          rate: externalItem.rating?.rate || 0,
          count: externalItem.rating?.count || 0
        },
        source: 'fakestoreapi',
        sourceId: String(externalItem.id),
        createdBy: userId
      };
      const item = await itemRepository.upsertBySourceId(String(externalItem.id), payload);
      syncedItems.push(item);
    }
    return syncedItems;
  }
};
