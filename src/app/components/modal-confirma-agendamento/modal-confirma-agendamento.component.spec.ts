import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalConfirmaAgendamentoComponent } from './modal-confirma-agendamento.component';

describe('ModalConfirmaAgendamentoComponent', () => {
  let component: ModalConfirmaAgendamentoComponent;
  let fixture: ComponentFixture<ModalConfirmaAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalConfirmaAgendamentoComponent]
    });
    fixture = TestBed.createComponent(ModalConfirmaAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
