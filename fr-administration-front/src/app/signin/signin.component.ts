import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiHelperService } from '../services/api-helper.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private api: ApiHelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  back(){
    this.router.navigateByUrl("/login");
  }

  signin(): void {
    const lastname: string = (
      document.getElementById('lastname') as HTMLInputElement
    ).value;
    const firstname: string = (
      document.getElementById('firstname') as HTMLInputElement
    ).value;
    const age = (
      document.getElementById('age') as HTMLInputElement
    ).value;
      if(!(lastname != "" && firstname != "" && age != "")){
        alert("Veuillez remplir les différents champs du formulaire")
        return
      }
      const pattern = /^[a-zA-Z ]*$/;
      if(!(pattern.test(lastname) && pattern.test(firstname))){
        alert("Le firstname ou le lastname n'est pas valide")
        return
      }
    this.api
      .post({ endpoint: '/users', data: { lastname : lastname , firstname : firstname, age : age } })
      .then(response => {
        console.log(response);
        alert("Compte créé.\nVous pouvez à présent vous connecter avec l'identifiant "+response.id);
        this.router.navigateByUrl('/login');

      })
      .catch(e => {
        alert("La création de compte a rencontré un problème");
      });
  }

}
