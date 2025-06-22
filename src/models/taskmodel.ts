import mongoose, { Document, Schema, Model, Types } from "mongoose";
import { IUser } from "./usermodel";
import { PaymentStatus, TaskStatus } from "./enumType";

 
 
// Interface for Task model
export interface ITask extends Document {
  _id: Types.ObjectId; 
  itemName: string;
  issuDate: Date;
  itemQuantity: number;
  itemUnit?: string; // Optional field for unit (pcs or bundles)
  submitDate?: Date;
  submitQuantity: number;
  submitUnit?: string; // Optional field for unit (pcs or bundles)
  comment?: string;
  taskStatus: TaskStatus;
  taskPrice: number;
  taskPayment: PaymentStatus;
  assignedTo: IUser["_id"]; // User ID reference
  createdAt?: Date;
  updatedAt?: Date;
}

// Task Schema 
const taskSchema = new Schema<ITask>(
  {
   
    itemName: { type: String, required: true },
    issuDate: { type: Date, required: true }, 
    itemQuantity: { type: Number, required: true },
    itemUnit: { type: String },
    submitDate: { type: Date },
    submitQuantity: { type: Number, required: true },
    submitUnit: { type: String }, // Optional field for unit (pcs or bundles)
    comment: { type: String },
    taskStatus: {
      type: String,
      enum: Object.values(TaskStatus),
      required: true,
      default: TaskStatus.PROCESSING, // Default to PROCESSING
    },
    taskPrice: { type: Number, required: true },
    taskPayment: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
      default: PaymentStatus.UNPAID, // Default to UNPAID
    },
    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "UserCollection",
      required: true,
    }, // Reference to User model
  },
  { timestamps: true }
);

// Check if the model is already compiled, if not compile it
export const TaskCollectionModel: Model<ITask> =
  mongoose.models.TaskCollection ||
  mongoose.model<ITask>("TaskCollection", taskSchema);
