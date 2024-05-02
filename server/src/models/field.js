import mongoose from 'mongoose';

const fieldSchema = new mongoose.Schema({
  fieldName: {
    type: String,
    trim: true,
    required: [true, 'Vui lòng nhập tên lĩnh vực'],
    maxLength: [100, 'Tên lĩnh vực không được vượt quá 100 ký tự'],
  },
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: [true, 'Vui lòng nhập mã khoa'],
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Field = mongoose.model('Field', fieldSchema);
export default Field;
