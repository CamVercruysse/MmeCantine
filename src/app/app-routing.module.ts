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
import { CommandesListComponent } from './lunchLady/commandes-list/commandes-list.component';

const routes: Routes = [
  { path: '', component: MenuContainerComponent },
  { path: 'repas', component: RepasComponent },
  { path: 'connexion', component: AuthComponent },
  { path: 'user-list', canActivate: [AuthGuard], component: UserComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: 'commandes-list', component: CommandesListComponent },  
  { path: 'menu/:id', component: MenuDetailsComponent },
  { path: '**', component: MenuContainerComponent },

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
