import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniaFormComponent } from './compania-form.component';

describe('CompaniaFormComponent', () => {
  let component: CompaniaFormComponent;
  let fixture: ComponentFixture<CompaniaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompaniaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
