import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormaCartaoComponent } from './forma-cartao.component';

describe('FormaCartaoComponent', () => {
  let component: FormaCartaoComponent;
  let fixture: ComponentFixture<FormaCartaoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormaCartaoComponent]
    });
    fixture = TestBed.createComponent(FormaCartaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
