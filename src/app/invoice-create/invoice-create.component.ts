import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InvoiceService } from '../services/invoice.service';
import { InvoiceDTO } from '../models/Invoice.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice-create',
  templateUrl: './invoice-create.component.html',
  styleUrls: ['./invoice-create.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ]
})
export class InvoiceCreateComponent {
  invoiceForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private invoiceService: InvoiceService,
    private router: Router
  ) {
    this.invoiceForm = this.fb.group({
      customerName: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      issueDate: ['', [Validators.required]],
      deadlineDate: ['', [Validators.required]],
      itemName: ['', [Validators.required]],
      comment: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.invoiceForm.invalid) {
      this.errorMessage = 'Kérjük, töltsd ki az összes kötelező mezőt helyesen!';
      return;
    }

    const invoiceData: InvoiceDTO = this.invoiceForm.value;
    this.invoiceService.createInvoice(invoiceData).subscribe({
      next: () => {
        this.router.navigate(['/invoices']);
      },
      error: (err) => {
        this.errorMessage = 'Hiba történt a számla létrehozása közben.';
        console.error('Hiba:', err);
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/invoices']);
  }
}