import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalMapaComponent } from '../../components/modal-mapa/modal-mapa.component';


@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.scss']
})
export class ContatoComponent {


  constructor(
    private modalService: NgbModal
  ) {
}

  openModal() {
    this.modalService.open(ModalMapaComponent, { fullscreen: true });
  }

}
