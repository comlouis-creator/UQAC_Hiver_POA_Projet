import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiHelperService } from '../services/api-helper.service';
import { DataApiService } from '../services/data-api.service';
import { TokenStorageService } from '../services/token-storage.service';

import { AssociationComponent } from './association.component';

describe('AssociationComponent', () => {
  let component: AssociationComponent;
  let fixture: ComponentFixture<AssociationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociationComponent ],
      imports: [RouterTestingModule],
      providers: [ HttpClient, HttpHandler,
        ApiHelperService,
        DataApiService,
        TokenStorageService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
