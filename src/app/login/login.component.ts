import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  createNewAccount() {
    this.router.navigate(['/home']);
  }
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('jwt', response.token);
        console.log(response.token);

        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Login error:', error);
      },
    });
  }
}
