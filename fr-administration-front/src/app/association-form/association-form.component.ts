import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ApiHelperService } from '../services/api-helper.service';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-association-form',
  templateUrl: './association-form.component.html',
  styleUrls: ['./association-form.component.css']
})
export class AssociationFormComponent implements OnInit {

  assocMembers: any[] = [];
  displayedColumns: string[] = ['id', 'name', 'role'];

  //@ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private api_helper: ApiHelperService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  createAssoc() {

    let assocName = (document.getElementById('assocName') as HTMLInputElement).value;
    let role = (document.getElementById('role') as HTMLInputElement).value;
    let vpContent = (document.getElementById('vp_content') as HTMLInputElement).value;
    let vpDate = (document.getElementById('vp_date') as HTMLInputElement).value;

    if(assocName.length === 0) {
      alert("Veuillez indiquez un nom d'association");
    } else if (role.length === 0) {
      alert("Veuillez indiquez votre rôle");
    }  else if(vpDate.length === 0) {
      alert("Veuillez indiquez la date de création");
    } else {

      let assocFormId: number;
      let verbalProcessId: number;
      var userIds: number[] = [Number(sessionStorage.getItem("currentId"))];
      var roles: string[] = [role];
  
      this.assocMembers.forEach(am => {
        userIds.push(am.id);
        roles.push(am.role);
      });
      this.api_helper.post(
        {
          endpoint: "/associations",
          data: {
            name: assocName,
            idUsers: userIds,
            roles: roles,
          }
        }
      ).then(response2 => {
        console.log(response2);
        this.router.navigateByUrl("/associations/" + assocName);
      })
    }
  }

  addMember(): void {

    const id = parseInt((document.getElementById('username') as HTMLInputElement).value);
    const role = (document.getElementById('userRole') as HTMLInputElement).value;

    if (Number(sessionStorage.getItem("currentId")) == id) {
      alert("Vous vous êtes déja ajouté à l'association.");
    }
    else if (this.assocMembers.find(u => u.id == id)) {
      this.assocMembers.find(u => u.id == id).role = role;
      console.log(this.assocMembers);
    } else {

      this.api_helper.get( {endpoint: "/users/id/"+id} )
          .then(response => {
            this.assocMembers.push({
              "id": id,
              "role": role,
              "name": response.firstname + " "+response.lastname
            });
            //this.table.renderRows();
          });
          
      console.log(this.assocMembers);
    }
  }


}
