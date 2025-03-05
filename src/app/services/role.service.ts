import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleDTO } from '../models/role.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: HttpClient) { }

  private baseUrl = "http://localhost:8080/api/roles";

  getRoles(): Observable<string[]> {
    return this.http.get<RoleDTO[]>(this.baseUrl).pipe(
      map(roles => roles.map(role => role.name))
    );
  }

  getAllRoles(): Observable<string[]> {
    return this.http.get<RoleDTO[]>(this.baseUrl + '/all').pipe(
      map(roles => roles.map(role => role.name))
    );
  }
}
