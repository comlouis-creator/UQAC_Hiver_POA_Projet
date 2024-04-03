import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersListComponent } from './users-list/users-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component'; 

import { TokenHttpInterceptor } from './interceptors/token.interceptor';
import { NavComponent } from './nav/nav.component';

import { UserComponent } from './user/user.component';
import { AssociationsListComponent } from './associations-list/associations-list.component';
import { SearchComponent } from './search/search.component';
import { SigninComponent } from './signin/signin.component';
import { AssociationComponent } from './association/association.component';
import { AssociationFormComponent } from './association-form/association-form.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ProfilComponent } from './profil/profil.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    UsersListComponent,
    LoginComponent,
    NavComponent,
    UserComponent,
    AssociationsListComponent,
    SearchComponent,
    SigninComponent,
    AssociationComponent,
    AssociationFormComponent,
    ProfilComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatInputModule,
  ],
  providers: [
     {
       provide: HTTP_INTERCEPTORS,
       useClass: TokenHttpInterceptor,
       multi: true,
     }, 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
