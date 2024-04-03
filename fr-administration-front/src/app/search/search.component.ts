import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, window } from 'rxjs';
import { Member } from '../interface/member';
import { ApiHelperService } from '../services/api-helper.service';
import { DataApiService } from '../services/data-api.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  userDisplayedColumns: string[] = ['id', 'lastname', 'firstname', 'age'];
  assocDisplayedColumns: string[] = ['name', 'dateOfCreation', 'members'];
  userDataSource: any[] = [];
  assocDataSource: any[] = [];
  searchData!: any;

  routeSub!: Subscription;
  constructor(
    private api_helper: ApiHelperService,
    private route: ActivatedRoute,
    private data_api: DataApiService
  ) { }

  ngOnInit(): void {
    //get search data from url
    this.routeSub = this.route.queryParams 
      .subscribe((params: { [x: string]: any; }) => {
        this.searchData = params['data'];
        console.log(this.searchData);
        this.getUserList()
        this.getAssociationList()
      }
      );
    }

    getUserList(){
    //Get users-list
    this.api_helper.get({ endpoint: "/users" })
      .then(response => {
        this.userDataSource = response;
        console.log(this.userDataSource);
        //Get res data
        
        

      }
    );
    }

    prettyPrintMembers(membres : Member[]) : string{
      let value : string = " "
      membres.forEach(elm => value = value.concat(elm.firstname.toString() + " " + elm.lastname.toString()) + " - ")
      console.log(value)
      return value
}

    getAssociationList(){
    //Get associations-list
    this.api_helper.get({ endpoint: "/associations" })
      .then(response => {
        this.assocDataSource = response;
      }
    );
  

  }
}

