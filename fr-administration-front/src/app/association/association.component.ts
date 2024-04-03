import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Association } from '../interface/association';
import { Member } from '../interface/member';
import { Role } from '../interface/role';
import { ApiHelperService } from '../services/api-helper.service';
import { DataApiService } from '../services/data-api.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-association',
  templateUrl: './association.component.html',
  styleUrls: ['./association.component.css']
})
export class AssociationComponent implements OnInit {

displayedRows: string[] = ["name", "dateOfCreation", "members"];
dataSource! :Association;
associationName!:any;

routeSub!: Subscription;

checkChange! :FormGroup
 dateOfCreationLastKnownValue! : String
 dateOfCreation! : Date;
 nameLastKnownValue! : String
 membersLastKnownValue! : Member[]

private disable: boolean = false


isCurrentUserMember = false;

incomingRoleName: any = "Membre";

constructor(
  private http :HttpClient,
  private api_helper: ApiHelperService,
  private data : DataApiService,
  private route: ActivatedRoute,
  private token : TokenStorageService,
  private router: Router
) {}

async ngOnInit(): Promise<void> {
  //get the id og teh user from url
  this.routeSub = this.route.params.subscribe(params => {
    this.associationName = params['name']
    
  });

    (await this.data.getAssociationByName(this.associationName)).subscribe(res => this.dataSource = res)
    this.dateOfCreationLastKnownValue = this.dataSource.dateOfCreation
  this.dateOfCreation = new Date(this.dataSource.dateOfCreation.toString());
    this.nameLastKnownValue = this.dataSource.name
    this.membersLastKnownValue = this.dataSource.members

  this.checkChange = new FormGroup({
  checkChangeDateOfCreation : new FormControl(),
  checkChangeName : new FormControl(),
  checkChangeMembers : new FormControl()
})
  this.checkChange.valueChanges.subscribe(res => {
    if(this.dateOfCreationLastKnownValue != this.checkChange.get("checkChangeDateOfCreation")?.value ||
    this.nameLastKnownValue != this.checkChange.get("checkChangeName")?.value ||
    this.membersLastKnownValue !=  this.checkChange.get("checkChangeMembers")?.value){
        this.disable = false;
    }else{
      this.disable = true;
    }
  })
  this.checkChange.get("checkChangeDateOfCreation")!.valueChanges.subscribe(res => this.dataSource.dateOfCreation = res)
  this.checkChange.get("checkChangeName")!.valueChanges.subscribe(res => this.dataSource.name = res)
  this.checkChange.get("checkChangeMembers")!.valueChanges.subscribe(res => this.dataSource.members = res)  

  //Check if current user is member of association
  let tmpRoles: Role[] = [];
  await this.api_helper.get({
    endpoint: "/users/" + sessionStorage.getItem("currentId") + "/roles"
  }).then(response => {
    console.log(response)

    // this.api_helper.get({
    //   endpoint: "/associations/"
    // }).then(response2 => console.log(response2))
    tmpRoles = response;
    if (tmpRoles?.find(r => r?.association?.name == this.associationName)) {
      this.isCurrentUserMember = true;
    }

  });

}

public checkDisable() : boolean {
  return this.disable
}

public updateAssociation(){
  console.log( this.associationName)
  this.api_helper.put({ 
    endpoint: "/associations/"+this.associationName,
    //queryParams: {id: parseInt(this.userId)},
    data : { name: this.dataSource.name}  
  }).then(response => {
    this.dataSource = response;
    this.dateOfCreationLastKnownValue = this.dataSource.dateOfCreation
    this.nameLastKnownValue = this.dataSource.name
    this.membersLastKnownValue = this.dataSource.members})
  console.log("mise à jour en cours")
  this.disable = true
}

ngOnDestroy() {
  this.routeSub.unsubscribe();
}

isModificationEnable() : boolean{
  return true
}

inscription(){
  this.data.assocInscription(this.associationName, this.incomingRoleName)
}

 isMember() : boolean {

  //return true;
  return this.isCurrentUserMember;
}

removeAssoc() {

  // this.api_helper.delete({
  //   endpoint: "/roles",
  //   data: { userId: sessionStorage.getItem("currentId"), associationName: this.associationName}
  // }).then(response => console.log(response));

  this.api_helper.delete({
    endpoint: "/associations/"+this.associationName
  }).then(response => this.router.navigateByUrl("/associations"))
}

  quitAssoc(): void {

    this.api_helper.delete({
      endpoint: "/roles",
      data: {userId:sessionStorage.getItem("currentId") , associationName: this.associationName}
    }).then(response => this.router.navigateByUrl("/associations"))
  }

}

