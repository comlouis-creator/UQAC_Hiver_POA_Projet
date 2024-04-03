import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(
    private api: ApiHelperService,
    private tokenStorageService: TokenStorageService,
    private route: Router,
  ) { }
  login(): void {
    const user: string = (document.getElementById('username') as HTMLInputElement).value;
    const password: string = (document.getElementById('password') as HTMLInputElement).value;
    this.api.post({ endpoint: '/auth/login', data: { user, password } }).then(response => {
      console.log(response);
      this.tokenStorageService.save(response.access_token);
      this.route.navigateByUrl("/users");
    });
    //this.api.post({ endpoint: '/auth/login', data: { user, password } }).then(response => console.log(response));
    //console.log(user, password);
  }
}
