import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Association } from '../interface/association';
import { Member } from '../interface/member';
import { DataApiService } from '../services/data-api.service';

@Component({
  selector: 'app-associations-list',
  templateUrl: './associations-list.component.html',
  styleUrls: ['./associations-list.component.css']
})
export class AssociationsListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'dateOfCreation', 'members'];
  dataSource! : Association[]


  constructor(private router : Router , private data_api : DataApiService) { }

  async ngOnInit(): Promise<void> {
    (await this.data_api.getAllAssociations()).subscribe(async res => {
      this.dataSource = res;
    console.log(this.dataSource)});
    }

    prettyPrintMembers(membres : Member[]) : string{
      let value : string = " "
      membres?.forEach(elm => value = value.concat(elm.firstname.toString() + " " + elm.lastname.toString()) + " - ")
      console.log(value)
      return value
}

  createAssociation(){
    this.router.navigate(['/associationCreation'])
  }
}
