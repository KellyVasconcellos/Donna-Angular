import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAgendamento } from '../../interface/agendamento';
import { ImodalConfirmacao } from 'src/app/interface/modal_confirm';

@Component({
  selector: 'app-modal-confirma-agendamento',
  standalone: true,
  templateUrl: './modal-confirma-agendamento.component.html',
  styleUrls: ['./modal-confirma-agendamento.component.scss']
})
export class ModalConfirmaAgendamentoComponent {

  @Input() agendamento!: ImodalConfirmacao;

	constructor(public activeModal: NgbActiveModal) {}
}
