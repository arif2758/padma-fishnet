import mongoose, { Document, Schema, Model } from "mongoose";
import { UserRole, UserStatus } from "./enumType";

// Interface for User model
export interface IUser extends Document {
  userId: string;
  avatarImage?: string;
  userName: string;
  userStatus: UserStatus;
  mobile: string; // mobile will act as the unique identifier

  address: string;
  reference: string;
  totalAmount: number;
  paidAmount: number;
  unPaidAmount: number;
  role: UserRole;
  password: string;
  email?: string;
  taskIds: Schema.Types.ObjectId[]; // Array of task references
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
   userId: { type: String, required: true, unique: true }, // Add required and unique


    avatarImage: { type: String },
    userName: { type: String, required: true },
    userStatus: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },
    mobile: { type: String, required: true, unique: true }, 
    address: { type: String },
    reference: { type: String },
    totalAmount: { type: Number, default: 0 },
    paidAmount: { type: Number, default: 0 },
    unPaidAmount: { type: Number, default: 0 },
    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.USER,
    },
    password: { type: String, required: true },
    email: { type: String },
    taskIds: [{ type: Schema.Types.ObjectId, ref: "TaskCollection" }],
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },

  { timestamps: true }
);

// Check if the model is already compiled, if not compile it
export const UserCollectionModel: Model<IUser> =
  mongoose.models.UserCollection ||
  mongoose.model<IUser>("UserCollection", userSchema);
