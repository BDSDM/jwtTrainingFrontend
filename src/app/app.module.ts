import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; // Assurez-vous que HttpClientModule et HTTP_INTERCEPTORS sont importés
import { RouterModule } from '@angular/router'; // Si vous utilisez des routes dans votre application

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Vérifiez que vous avez correctement configuré le routage
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TokenInterceptorService } from './auth/token-interceptor.service';
import { AuthGuard } from './home/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule, // Ajoutez RouterModule si vous utilisez des routes
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    AuthGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
