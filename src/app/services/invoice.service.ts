import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceDTO } from '../models/Invoice.model';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8080/api/invoices';

  constructor(private http: HttpClient) { }

  getAllInvoices(): Observable<InvoiceDTO[]> {
    return this.http.get<InvoiceDTO[]>(this.apiUrl);
  }

  getInvoiceById(id: number): Observable<InvoiceDTO> {
    return this.http.get<InvoiceDTO>(`${this.apiUrl}/${id}`);
  }

  createInvoice(invoice: InvoiceDTO): Observable<InvoiceDTO> {
    return this.http.post<InvoiceDTO>(`${this.apiUrl}/create`, invoice);
  }
}