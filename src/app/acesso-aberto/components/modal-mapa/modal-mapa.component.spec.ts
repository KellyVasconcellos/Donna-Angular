import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMapaComponent } from './modal-mapa.component';

describe('ModalMapaComponent', () => {
  let component: ModalMapaComponent;
  let fixture: ComponentFixture<ModalMapaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMapaComponent]
    });
    fixture = TestBed.createComponent(ModalMapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
