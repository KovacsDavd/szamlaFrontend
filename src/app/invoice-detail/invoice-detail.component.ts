import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceDTO } from '../models/Invoice.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.css'],
  imports: [CommonModule]
})
export class InvoiceDetailComponent implements OnInit {
  invoice: InvoiceDTO | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private invoiceService: InvoiceService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadInvoice(Number(id));
    }
  }

  loadInvoice(id: number): void {
    this.invoiceService.getInvoiceById(id).subscribe({
      next: (invoice) => {
        console.log('Kapott számla adatok:', invoice);
        this.invoice = invoice;
      },
      error: (err) => console.error('Hiba történt a számla betöltésekor:', err)
    });
  }

  navigateBack(): void {
    this.router.navigate(['/invoices']);
  }
}