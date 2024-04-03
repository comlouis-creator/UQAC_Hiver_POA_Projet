import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  isLogged: Boolean = false;
  searchData!: any;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.isLogged = this.tokenStorageService.isLogged();
  }

  logout(): void {
    console.log("click on logout !");
    this.tokenStorageService.clear();
    this.route.navigateByUrl("/login");
  }

  getAssociations() : void {
    console.log("click on Associations !");
    this.route.navigateByUrl("/associations");
  }
  getUsers(): void {
    console.log("click on Users !");
    this.route.navigateByUrl("/users");
  }

  search(): void {
    console.log("recherche en cours ...");
    //this.router.navigateByUrl("/search?data=" + this.searchData);
    this.route.navigate(
      ['/search'],
      { queryParams: { data: this.searchData } }
    );
  }

  public updateUser(){
    console.log("click on update user !");
    this.route.navigateByUrl("/profil");
  }



}
