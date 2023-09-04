import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IServicos } from '../../interface/servico';

@Component({
  selector: 'app-lista-servico',
  templateUrl: './lista-servico.component.html',
  styleUrls: ['./lista-servico.component.scss']
})
export class ListaServicoComponent {

  @Input() servicos: Array<IServicos> = [];
  @Input() showBotao: boolean = true;

  @Output() idServico = new EventEmitter<number>();

  getIdServico(id:number){
    this.idServico.emit(id)
  }

}
