import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard'

export const routes: Routes = [
    { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
    { path: 'regist', loadComponent: () => import('./regist/regist.component').then(m => m.RegisterComponent) },
    { path: 'admin', loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent), canActivate: [AuthGuard] },
    { path: 'invoices/create', loadComponent: () => import('./invoice-create/invoice-create.component').then(m => m.InvoiceCreateComponent), canActivate: [AuthGuard] },
    { path: 'invoices', loadComponent: () => import('./invoice-list/invoice-list.component').then(m => m.InvoiceListComponent), canActivate: [AuthGuard] },
    { path: 'invoices/:id', loadComponent: () => import('./invoice-detail/invoice-detail.component').then(m => m.InvoiceDetailComponent), canActivate: [AuthGuard] },
];
