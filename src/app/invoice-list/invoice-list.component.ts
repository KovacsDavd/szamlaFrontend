import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceDTO } from '../models/Invoice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css'],
  imports: [CommonModule]
})
export class InvoiceListComponent implements OnInit {
  invoices: InvoiceDTO[] = [];

  constructor(private invoiceService: InvoiceService, private router: Router) { }

  ngOnInit(): void {
    this.loadInvoices();
  }

  loadInvoices(): void {
    this.invoiceService.getAllInvoices().subscribe({
      next: (invoices) => {
        console.log('Kapott számla adatok:', invoices);
        this.invoices = invoices;
      },
      error: (err) => console.error('Hiba történt a számlák betöltésekor:', err)
    });
  }

  navigateToCreate(): void {
    this.router.navigate(['/invoices/create']);
  }

  navigateToDetail(id: number): void {
    this.router.navigate(['/invoices', id]);
  }
}