import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './shared/services/auth.service';
import { UserComponent } from './user/user.component';
import { ProfileComponent } from './profile/profile.component';
import { MenuContainerComponent } from './menu-container/menu-container.component';
import { MenuDetailsComponent } from './menu-container/menu-details/menu-details.component';
import { RepasComponent } from './repas/repas.component';
import { CommandesComponent } from './commandes/commandes.component';
import { AuthInterceptor } from './shared/interceptor/auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AuthComponent,
    UserComponent,
    ProfileComponent,
    MenuContainerComponent,
    MenuDetailsComponent,
    RepasComponent,
    CommandesComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }