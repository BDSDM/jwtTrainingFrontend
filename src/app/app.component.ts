import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'aJwtTrainingFrontend';
  constructor(private authService: AuthService, private router: Router) {}
  ngOnInit(): void {
    this.authService.checkActivity();
  }
}
