import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HomeDTO } from '../models/home.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  homeData: HomeDTO | null = null;

  menuItemTranslations: { [key: string]: string } = {
    INVOICES: 'Számlák',
    CREATE_INVOICE: 'Számla létrehozása',
    ADMIN: 'Admin'
  };

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.authService.getHomeData().subscribe({
      next: (data) => {
        this.homeData = data;
      },
      error: () => {
        this.homeData = null;
      }
    });
  }

  getRouterLink(menuItem: string): string {
    switch (menuItem) {
      case 'INVOICES':
        return '/invoices';
      case 'CREATE_INVOICE':
        return '/invoices/create';
      case 'ADMIN':
        return '/admin';
      default:
        return '/';
    }
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }
}