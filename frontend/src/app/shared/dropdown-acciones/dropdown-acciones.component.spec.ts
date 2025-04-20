import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownAccionesComponent } from './dropdown-acciones.component';

describe('DropdownAccionesComponent', () => {
  let component: DropdownAccionesComponent;
  let fixture: ComponentFixture<DropdownAccionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownAccionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DropdownAccionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
