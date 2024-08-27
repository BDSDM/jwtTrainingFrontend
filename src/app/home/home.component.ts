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
  colors: string[] = ['red', 'blue', 'green', 'yellow', 'purple'];
  currentColor: string = 'white'; // Valeur par défaut initiale
  username: string = '';
  users: User[] = [];
  newRole: string = '';
  selectedUserId: number | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.loadUserData();
    this.loadColorPreference(); // Charger la couleur dès le chargement
  }

  loadUserData() {
    this.authService.getAllUsers().subscribe(
      (data) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching user data', error);
      }
    );

    this.authService.getUser().subscribe({
      next: (data: User) => {
        this.username = data.username;
      },
      error: (error) => {
        console.error('Error fetching user data', error);
      },
    });
  }

  deconnexion() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addRole() {
    if (this.selectedUserId && this.newRole) {
      this.authService
        .addRoleToUser(this.selectedUserId, this.newRole)
        .subscribe(
          (response) => {
            const user = this.users.find((u) => u.id === this.selectedUserId);
            if (user) {
              user.roles.push(this.newRole);
            }
            this.newRole = '';
          },
          (error) => {
            console.error('Error adding role', error);
          }
        );
    }
  }

  removeRole(userId: number, role: string) {
    this.authService.removeRoleFromUser(userId, role).subscribe(
      (response) => {
        const user = this.users.find((u) => u.id === userId);
        if (user) {
          user.roles = user.roles.filter((r) => r !== role);
        }
      },
      (error) => {
        console.error('Error removing role', error);
      }
    );
  }

  selectUser(userId: number) {
    this.selectedUserId = userId;
  }

  deleteUser(userId: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.authService.deleteUser(userId).subscribe(
        () => {
          this.users = this.users.filter((user) => user.id !== userId);
        },
        (error) => {
          console.error('Error deleting user', error);
        }
      );
    }
  }

  setColor(color: string): void {
    this.authService.setColorPreference(color).subscribe({
      next: () => {
        this.currentColor = color;
        console.log('Couleur définie avec succès : ' + color);
      },
      error: (error) => {
        console.error('Erreur lors de la définition de la couleur :', error);
      },
    });
  }

  loadColorPreference(): void {
    this.authService.getColorPreference().subscribe({
      next: (color) => {
        console.log('Couleur récupérée du backend :', color);
        this.currentColor = color || 'white'; // Appliquer la couleur récupérée
      },
      error: (error) => {
        console.error('Erreur lors de la récupération de la couleur :', error);
        this.currentColor = 'white'; // Définir la couleur par défaut en cas d'erreur
      },
    });
  }
}
