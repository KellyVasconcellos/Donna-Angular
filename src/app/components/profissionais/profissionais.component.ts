import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { IFuncionario } from '../../interface/funcionario';
import { Output, EventEmitter } from '@angular/core';
import { IProfissionais } from './profissionais';

@Component({
  selector: 'app-profissionais',
  templateUrl: './profissionais.component.html',
  styleUrls: ['./profissionais.component.scss'],
})
export class ProfissionaisComponent implements OnChanges {

  @Input() profissionais: Array<IFuncionario> = [];

  @Output() idFuncionario = new EventEmitter<number>();

  interfaceFunc: Array<IProfissionais> = []
  interfaceFuncNova: Array<IProfissionais> = []


  ngOnChanges(changes: SimpleChanges): void {
    this.profissionais.forEach(item => {
      let interfaceProfissionais: IProfissionais = {
        id: item.id,
        foto: item.foto,
        nome: item.nome,
        especialidade: item.especialidade,
        opacity: true,
      }
      this.interfaceFunc.push(interfaceProfissionais)
    })
  }

  getId(id: number) {
    this.idFuncionario.emit(id)
    this.interfaceFunc.forEach(item => {
      if(id == item.id){
        let interfaceProfissionais: IProfissionais = {
          id: item.id,
          foto: item.foto,
          nome: item.nome,
          especialidade: item.especialidade,
          opacity: true,
        }
        this.interfaceFuncNova.push(interfaceProfissionais)
      } else {
        let interfaceProfissionais: IProfissionais = {
          id: item.id,
          foto: item.foto,
          nome: item.nome,
          especialidade: item.especialidade,
          opacity: false,
        }
        this.interfaceFuncNova.push(interfaceProfissionais)
      }
    })
    this.interfaceFunc = []
    this.interfaceFunc = this.interfaceFuncNova
    this.interfaceFuncNova = []
  }
}
