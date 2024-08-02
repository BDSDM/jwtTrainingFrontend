import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User } from './user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  username: string = '';
  user!: User;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    /* this.authService.getHomeContent().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    ); */
    this.authService.getUser().subscribe({
      next: (data: User) => {
        this.username = data.username
      },
    });
  }
  deconnexion() {
    this.authService.logout();
  }
}
