import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-mapa',
  standalone: true,
  templateUrl: './modal-mapa.component.html',
  styleUrls: ['./modal-mapa.component.scss']
})
export class ModalMapaComponent {

  constructor(public activeModal: NgbActiveModal) {}
}

