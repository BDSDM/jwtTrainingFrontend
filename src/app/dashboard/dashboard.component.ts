import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  data: any;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getDashboardContent().subscribe(
      (data) => {
        this.data = data;
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
