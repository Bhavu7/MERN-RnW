import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    description: { type: String, required: true, trim: true, maxlength: 2000 },
    price: { type: Number, required: true, min: 0 },
    category: { type: String, required: true, trim: true },
    image: { type: String, default: '' },
    rating: {
      rate: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 }
    },
    source: { type: String, default: 'local' },
    sourceId: { type: String, default: null, index: true },
    status: { type: String, enum: ['draft', 'published'], default: 'published' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  { timestamps: true }
);

itemSchema.index({ title: 'text', description: 'text', category: 'text' });
itemSchema.index({ sourceId: 1, createdBy: 1 }, { unique: true, partialFilterExpression: { sourceId: { $type: 'string' } } });

export const Item = mongoose.model('Item', itemSchema);
