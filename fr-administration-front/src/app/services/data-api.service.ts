import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Association } from '../interface/association';
import { User } from '../interface/user';
import { ApiHelperService } from './api-helper.service';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  private lstUser! : User[]
  private user! : User
  private lstAssociation! : Association[]
  private association! : Association

  constructor(private api_helper : ApiHelperService) {}

    async getAllUsers(): Promise<Observable<User[]>> {
      await this.api_helper.get({endpoint : "/users"}).then(response => this.lstUser = response)
      return of(this.lstUser)
  }
    async getUserById(userId : number ) : Promise<Observable<User>>{
      await this.api_helper.get({ endpoint: "/users/" + userId }).then(response => this.user = response)
      return of(this.user)
}
  async getAssociationByName(assocName : string ): Promise<Observable<Association>>{
    await this.api_helper.get({endpoint : "/associations/" + assocName}).then(response => this.association = response)
    return of(this.association)
  }

  async assocInscription(assocName : string, nomRole : string){
    console.log(" name :" + nomRole + " association : " +  assocName  +" user : " + sessionStorage.getItem("currentId"))
    await this.api_helper.post({endpoint : "/roles", data : {name : nomRole,userId : sessionStorage.getItem("currentId"), associationName : assocName }})
    .then(response => {
      console.log(response);
      alert("Vous êtes maintenant membre de l'association");
    })
    }


  getUserByLastName(lastName : String) : Observable<User[]>{
    return of(this.lstUser.filter(elm => elm.lastname == lastName ))
  }

  getUserByFirstName(firstname : String) : Observable<User[]>{
    return of(this.lstUser.filter(elm => elm.firstname == firstname ))
  }

  getUserByName(firstname : String, lastName:String ) : Observable<User[]>{
    return of(this.lstUser.filter(elm => (elm.firstname == firstname && elm.lastname == lastName )))
  }



  async getAllAssociations() : Promise<Observable<Association[]>>{
    await this.api_helper.get({endpoint : "/associations"}).then(response => {
      this.lstAssociation = response;
      console.log("get associations")
      console.log(response)})
      return of(this.lstAssociation)
  }

  
}
