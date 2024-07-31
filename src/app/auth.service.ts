import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api';

  constructor(private http: HttpClient, private router: Router) {}

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  checkActivity() {
    const token = localStorage.getItem('jwt');
    if (token) {
      const jwt = JSON.parse(atob(token.split('.')[1]));

      const expires = new Date(jwt.exp * 1000);
      const timeout = expires.getTime() - Date.now();
      //Vérifier si le token a expiré
      if (timeout <= 0) {
        this.logout();
      }
    }
  }

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
