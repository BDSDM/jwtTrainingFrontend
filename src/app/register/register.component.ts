import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    // Assurez-vous qu'il n'y a pas de redirection ici
  }

  register_2() {
    this.authService.register(this.username, this.password).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Registration error:', error);
      }
    );
  }
}
