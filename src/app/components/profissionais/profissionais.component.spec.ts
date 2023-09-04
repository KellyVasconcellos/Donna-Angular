import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfissionaisComponent } from './profissionais.component';

describe('ProfissionaisComponent', () => {
  let component: ProfissionaisComponent;
  let fixture: ComponentFixture<ProfissionaisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfissionaisComponent]
    });
    fixture = TestBed.createComponent(ProfissionaisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
