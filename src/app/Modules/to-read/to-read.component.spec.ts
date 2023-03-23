import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToReadComponent } from './to-read.component';

describe('ToReadComponent', () => {
  let component: ToReadComponent;
  let fixture: ComponentFixture<ToReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToReadComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
