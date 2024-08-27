import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { User } from './home/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8081/api';
  private apiUrlG = 'http://localhost:8081/api/admin';
  private apiUrlD = 'http://localhost:8081/api/users/me';
  username: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  addRoleToUser(userId: number, role: string): Observable<any> {
    return this.http.post(`${this.apiUrlG}/user/${userId}/addRole`, role);
  }

  removeRoleFromUser(userId: number, role: string): Observable<any> {
    return this.http.post(`${this.apiUrlG}/user/${userId}/removeRole`, role);
  }

  deleteUser(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrlG}/user/${userId}`);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrlG}/all`);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  getUser(): Observable<User> {
    return this.http.get<User>(this.apiUrlD);
  }

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

  getUsername(): string {
    return this.username;
  }

  // Méthode pour définir la préférence de couleur
  setColorPreference(color: string): Observable<any> {
    // Créer un paramètre de requête pour la couleur
    const params = new HttpParams().set('color', color);

    // Envoyer la requête POST avec les cookies
    return this.http.post(`${this.apiUrl}/set-color`, null, {
      params,
      responseType: 'text', // Spécifier le type de réponse attendu
      withCredentials: true, // Inclure les cookies dans la requête
    });
  }

  // Méthode pour obtenir la préférence de couleur
  getColorPreference(): Observable<string> {
    // Envoyer la requête GET avec les cookies
    return this.http.get(`${this.apiUrl}/get-color`, {
      responseType: 'text', // Spécifier le type de réponse attendu
      withCredentials: true, // Inclure les cookies dans la requête
    });
  }
}
