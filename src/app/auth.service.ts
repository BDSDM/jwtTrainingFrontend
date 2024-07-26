import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/login`, {
      username,
      password,
    });
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/users/register`, {
      username,
      password,
      role: 'USER',
    });
  }

  getHomeContent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/home`);
  }

  getDashboardContent(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin/dashboard`);
  }
}
