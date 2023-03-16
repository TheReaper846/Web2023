import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuLibraryComponent } from './menu-library.component';

describe('MenuLibraryComponent', () => {
  let component: MenuLibraryComponent;
  let fixture: ComponentFixture<MenuLibraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuLibraryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuLibraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
