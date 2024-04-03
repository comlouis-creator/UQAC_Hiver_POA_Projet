import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { User } from '../interface/user';
import { ApiHelperService } from '../services/api-helper.service';
import { DataApiService } from '../services/data-api.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  displayedRows: string[] = ['id', 'lastname', 'firstname', 'age'];
  dataSource! :User;
  userId!:any;
  assocMembers: any[] = [];

  routeSub!: Subscription;

  checkChange! :FormGroup
   lastNameLastKnownValue! : String
   firstNameLastKnownValue! : String
   ageLastKnownValue! : number

  private disable: boolean = false
  


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
    this.routeSub = this.route.url.subscribe(async url => {
      this.userId = url[1].path;
      (await this.data.getUserById(this.userId)).subscribe((res: User) => this.dataSource = res)
      this.lastNameLastKnownValue = this.dataSource.lastname
      this.firstNameLastKnownValue = this.dataSource.firstname
      this.ageLastKnownValue = this.dataSource.age

    this.checkChange = new FormGroup({
    checkChangeFirstName : new FormControl(),
    checkChangeLastName : new FormControl(),
    checkChangeAge : new FormControl()
  })
    this.checkChange.valueChanges.subscribe(res => {
      if(this.lastNameLastKnownValue != this.checkChange.get("checkChangeLastName")?.value ||
      this.firstNameLastKnownValue != this.checkChange.get("checkChangeFirstName")?.value ||
      this.ageLastKnownValue !=  this.checkChange.get("checkChangeAge")?.value){
          this.disable = false;
      }else{
        this.disable = true;
      }
    })
    this.checkChange.get("checkChangeAge")!.valueChanges.subscribe(res => this.dataSource.age = res)
    this.checkChange.get("checkChangeFirstName")!.valueChanges.subscribe(res => this.dataSource.firstname = res)
    this.checkChange.get("checkChangeLastName")!.valueChanges.subscribe(res => this.dataSource.lastname = res)

    });

      
    
  }

  public checkDisable() : boolean {
    return this.disable
  }

  public updateUser(){
    const pattern = /^[a-zA-Z ]*$/;
    console.log(this.dataSource.firstname.toString())
    if(!(pattern.test(this.dataSource.firstname.toString()) && pattern.test(this.dataSource.lastname.toString()))){
      alert("Le firstname ou le lastname n'est pas valide")
      return
    }
    this.api_helper.put({ 
      endpoint: "/users/"+this.userId,
      //queryParams: {id: parseInt(this.userId)},
      data : {firstname: this.dataSource.firstname, lastname: this.dataSource.lastname, age: this.dataSource.age}  
    }).then(response => {
      this.dataSource = response;
      this.lastNameLastKnownValue = this.dataSource.lastname
      this.firstNameLastKnownValue = this.dataSource.firstname
      this.ageLastKnownValue = this.dataSource.age})

    console.log("mise à jour en cours")
    this.disable = true
  }

  public deleteAccount() : void {
    console.log("Removal of account in progress ...");
    
    this.api_helper.get({
      endpoint: "/users/"+this.userId+"/roles"
    }).then(response => {
      //Deleting the roles first
      for(let i=0; i<response.length; i++) {
        console.log(response[i].association.name);
        this.api_helper.delete({
          endpoint: "/roles",
          data: {userId:this.userId , associationName: response[i].association.name}
        }).then(response2 => console.log(response2))
      }

      // Deleting the user then
      this.api_helper.delete({
        endpoint: "/users/" + this.userId
      }).then(response => {
        console.log(response);
        this.router.navigateByUrl('/login');
      });

    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

  /*isModificationEnable() : boolean{
    return this.token.isModificationAuthorised(this.userId)
  }*/

}
export { User };

