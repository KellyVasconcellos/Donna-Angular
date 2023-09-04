import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicoComponent } from './lista-servico.component';

describe('ListaServicoComponent', () => {
  let component: ListaServicoComponent;
  let fixture: ComponentFixture<ListaServicoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListaServicoComponent]
    });
    fixture = TestBed.createComponent(ListaServicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
