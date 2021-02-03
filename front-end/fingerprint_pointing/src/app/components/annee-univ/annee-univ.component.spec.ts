import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnneeUnivComponent } from './annee-univ.component';

describe('AnneeUnivComponent', () => {
  let component: AnneeUnivComponent;
  let fixture: ComponentFixture<AnneeUnivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnneeUnivComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnneeUnivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
