export interface InvoiceDTO {
    id: number;
    customerName: string;
    price: number;
    issueDate: string;
    deadlineDate: string;
    itemName: string;
    comment: string;
  }