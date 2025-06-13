export interface Task {
  key: string;
  item: string;
  issueDate: string;
  issueQuantity: number;
  issueUnit: "পিস" | "বান্ডেল";
  submitDate: string;
  submitQuantity: number;
  submitUnit: "পিস" | "বান্ডেল";
  comment: string;
  status: "pending" | "complete" | "partial";
  payment: "paid" | "unpaid";
  amount: number;
}
