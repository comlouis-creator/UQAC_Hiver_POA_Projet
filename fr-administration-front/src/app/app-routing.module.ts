import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { UsersListComponent } from './users-list/users-list.component';

import { AuthGuard } from './guards/auth.guard';

import { AssociationFormComponent } from './association-form/association-form.component';
import { AssociationComponent } from './association/association.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './signin/signin.component';
import { UserComponent } from './user/user.component';
import { ProfilComponent } from './profil/profil.component';

const routes: Routes = [
   { path: 'users', component: UsersListComponent, canActivate: [AuthGuard] },
   { path: 'user/:id', component: UserComponent, canActivate: [AuthGuard]},
   { path: 'profil', component: UserComponent, canActivate: [AuthGuard]},
   { path: 'associationCreation', component : AssociationFormComponent, canActivate : [AuthGuard]},
   { path : 'associations/:name', component : AssociationComponent, canActivate : [AuthGuard]},
   { path : 'associations', component : AssociationsListComponent, canActivate: [AuthGuard]},
   { path: 'search', component: SearchComponent, canActivate: [AuthGuard] },
   { path: 'signin', component: SigninComponent },
   { path: '', component: LoginComponent,
       canActivate: [AuthGuard] 
   },
   {path: '', redirectTo:'login', pathMatch:'full'},
   { path:'**', component: LoginComponent},
   
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
