import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, lastValueFrom  } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
   displayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
   dataSource = [];
   

   constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const resquest: Observable<any> = this.http.get('http://localhost:3000/users', { observe: 'response' });
    resquest.toPromise().then(response => this.dataSource = response.body);
    //request.subscribe({ (response) => this.dataSource = response.body });
  }

  openUserDetail(user: any):void {
    console.log(user);
    this.router.navigateByUrl('/profil')
  }


}



