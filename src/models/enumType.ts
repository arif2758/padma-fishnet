// Enum for user roles
export enum UserRole {
  USER = "user",
  WORKER = "worker",
  ADMIN = "admin",
  MANAGER = "manager",
}

// Enum for user status
export enum UserStatus {
  ACTIVE = "active",
  DEACTIVE = "deactive",
}

// Enum for task status
export enum TaskStatus {
  COMPLETE = "complete",
  PROCESSING = "processing",
  PARTIAL = "partial",
}

// Enum for payment status
export enum PaymentStatus {
  PAID = "paid",
  UNPAID = "unpaid",
}

export interface IClientTask {
  _id: string;

  itemName: string;
  issuDate: string;
  itemQuantity: number;
  itemUnit?: string;
  submitDate?: string | null;
  submitQuantity: number;
  submitUnit?: string;
  comment?: string;
  taskStatus: TaskStatus;
  taskPrice: number;
  taskPayment: PaymentStatus;
  assignedTo: string;
}
