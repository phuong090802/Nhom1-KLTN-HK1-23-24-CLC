import mongoose from 'mongoose';

const generalFieldSchema = new mongoose.Schema(
  {
    fieldName: {
      type: String,
      trim: true,
      required: [true, 'Vui lòng nhập tên lĩnh vực'],
      maxLength: [100, 'Tên lĩnh vực không được vượt quá 100 ký tự'],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'general-fields' }
);

const Field = mongoose.model('GeneralField', generalFieldSchema);
export default Field;
