import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {
    const token = this.authService.getToken();
    const roles = this.authService.getRoles();

    const currentRoute = state.url;

    if (currentRoute === '/admin' && !roles.includes('ADMIN')) {
      this.router.navigate(['/']);
      return false;
    }

    if (currentRoute === '/invoices/create' && (!roles.includes('ADMIN') && !roles.includes('ACCOUNTANT'))) {
      this.router.navigate(['/']);
      return false;
    }

    return true;
  }
}
