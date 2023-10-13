import { Component} from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-perfil',
  standalone: true,
  templateUrl: './modal-perfil.component.html',
  styleUrls: ['./modal-perfil.component.scss'],

})
export class ModalPerfilComponent {

	constructor(public activeModal: NgbActiveModal) {}
}
