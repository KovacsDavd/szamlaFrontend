import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginRequestDTO, LoginResponseDTO } from '../models/login.model';
import { HomeDTO } from '../models/home.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private rolesSubject = new BehaviorSubject<string[]>([]);
  roles$ = this.rolesSubject.asObservable();
  private baseUrl = "http://localhost:8080/";

  constructor(private http: HttpClient, private router: Router) {
    const storedToken = localStorage.getItem('token');
    const storedRoles = localStorage.getItem('roles');
    if (storedToken) {
      this.loggedIn.next(true);
    }
    if (storedRoles) {
      this.rolesSubject.next(JSON.parse(storedRoles));
    }
  }

  login(username: string, password: string): Observable<LoginResponseDTO> {
    const loginRequest: LoginRequestDTO = { username, password };
    return this.http.post<LoginResponseDTO>(this.baseUrl + 'api/auth/login', loginRequest).pipe(
      tap(response => {
        const roleNames = response.roles.map(role => role.name);
        this.setSessionData(response.token, roleNames);
      })
    );
  }

  register(name: string, username: string, password: string, role: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/signup', { name, username, password, role });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.loggedIn.next(false);
    this.rolesSubject.next([]);
    this.router.navigate(['/login']);
  }

  getHomeData(): Observable<HomeDTO> {
    return this.http.get<HomeDTO>(this.baseUrl + 'api/home');
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLoggedIn(value: boolean): void {
    this.loggedIn.next(value);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRoles(): string[] {
    return this.rolesSubject.getValue();
  }

  setSessionData(token: string, roles: string[]): void {
    localStorage.setItem('token', token);
    localStorage.setItem('roles', JSON.stringify(roles));
    this.loggedIn.next(true);
    this.rolesSubject.next(roles);
  }

  validateToken(): Observable<boolean> {
    return this.http.get<boolean>(this.baseUrl + 'api/auth/validateToken');
  }
}
