import { Component } from '@angular/core';
import { FuncionarioService } from '../../service/funcionario.service';
import { IFuncionario } from '../../interface/funcionario';

@Component({
  selector: 'app-sobre',
  templateUrl: './sobre.component.html',
  styleUrls: ['./sobre.component.scss'],
})
export class SobreComponent {
  funcionarios: Array<IFuncionario> = [];

  profissionais = [];

  constructor(private funcionarioService: FuncionarioService) {}

  ngOnInit(): void {
    this.funcionarioService
      .getFuncionarios()
      .subscribe((resposta: Array<IFuncionario>) => {
        this.funcionarios = resposta;
      });
  }

  getIdFuncionario(id:number):void {
    console.log(id)
   }
}
