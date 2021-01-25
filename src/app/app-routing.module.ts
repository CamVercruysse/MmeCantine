import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AuthComponent } from './auth/auth.component';
import { UserComponent } from './user/user.component';
import { AuthGuard } from './guards/auth.guard';
import { ProfileComponent } from './profile/profile.component';
import { MenuContainerComponent } from './menu-container/menu-container.component';
import { MenuDetailsComponent } from './menu-container/menu-details/menu-details.component';
import { RepasComponent } from './repas/repas.component';
import { CommandesComponent } from './commandes/commandes.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import {UpdateUserComponent} from './update-user/update-user.component';

const routes: Routes = [
  { path: '', component: MenuContainerComponent },
  { path: 'repas', component: RepasComponent },
  { path: 'connexion', component: AuthComponent },
  { path: 'user-list', canActivate: [AuthGuard], component: UserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'updateUser', component: UpdateUserComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'menu/:id', component: MenuDetailsComponent },
  { path: 'user/:id', component: UserDetailComponent },
  { path: '**', component: MenuContainerComponent },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
