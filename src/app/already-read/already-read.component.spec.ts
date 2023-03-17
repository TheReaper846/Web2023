import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlreadyReadComponent } from './already-read.component';

describe('AlreadyReadComponent', () => {
  let component: AlreadyReadComponent;
  let fixture: ComponentFixture<AlreadyReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlreadyReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlreadyReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
