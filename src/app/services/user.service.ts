import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = "http://localhost:8080/api/admin/";

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + "users");
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(this.baseUrl + `user/${id}`);
  }

  updateUserRoles(id: number, roles: string[]): Observable<User> {
    return this.http.put<User>(
      this.baseUrl + `user/roles/${id}`,
      Array.from(new Set(roles)),
      { headers: { 'Content-Type': 'application/json' } }
    );
  }
}