import { Component, OnInit } from '@angular/core';
import { IHorario } from '../../interface/horario';
import { DiaHorarioEnum } from '../../enum/diaHorario';
import { FuncionarioService } from '../../service/funcionario.service';
import { IFuncionario } from '../../interface/funcionario';
import { IServico } from '../../interface/servico';
import { IListaServico } from '../../interface/lista_servico';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {

  idProfissional!: number;

  numero = 1;

  funcionarios: Array<IFuncionario> = [];
  servicos: Array<IServico> = [];
  servico!: IServico;
  listaServico: Array<IListaServico> = [];
  ihorario!: IHorario;

  profissionais = [];

  panels = ['First'];

  constructor(
    private funcionarioService: FuncionarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.funcionarioService
      .getFuncionarios()
      .subscribe((resposta: Array<IFuncionario>) => {
        this.funcionarios = resposta;
      });

    this.funcionarioService
      .getListaServico()
      .subscribe((resposta: Array<IListaServico>) => {
        this.listaServico = resposta;
      });

    this.pegaDiaAtual();
  }

  getIdFuncionario(id: number): void {
    this.idProfissional = id
    this.funcionarioService
      .getServicosPorFuncionario(id)
      .subscribe((resposta: Array<IServico>) => {
        this.servicos = resposta;
        this.servico = this.servicos[0];
      });
  }

  horarios: Array<IHorario> = [
    {
      dia: 'Segunda-Feira',
      horario: '09:00 - 21:00',
    },
    {
      dia: 'Terça-Feira',
      horario: '09:00 - 21:00',
    },
    {
      dia: 'Quarta-Feira',
      horario: '09:00 - 21:00',
    },
    {
      dia: 'Quinta-Feira',
      horario: '09:00 - 21:00',
    },
    {
      dia: 'Sexta-Feira',
      horario: '09:00 - 21:00',
    },
    {
      dia: 'Sábado',
      horario: '08:00 - 19:00',
    },
    {
      dia: 'Domingo',
      horario: 'Fechado',
    },
  ];

  diaAtual(dia: string): boolean {
    const data = new Date();
    const pegaDiaEnum = DiaHorarioEnum[data.getDay()];
    if (pegaDiaEnum == dia) {
      return true;
    } else {
      return false;
    }
  }

  pegaDiaAtual() {
    const data = new Date();
    const pegaDiaEnum = DiaHorarioEnum[data.getDay()];
    this.horarios.forEach((item) => {
      if (pegaDiaEnum == item.dia) {
        this.ihorario = item;
      }
    });
  }

  enviaNumero(valor: number) {
    this.numero = valor;
    console.log(this.numero);
  }

  getIdServico(idServico:number){
    // this.sessaoService.salvarSessao(SessaoEnum.CHAVE_FUNCIONARIO,this.idProfissional.toString())
    // this.sessaoService.salvarSessao(SessaoEnum.CHAVE_SERVICO,idServico.toString())
    // this.router.navigateByUrl("/login")
  }
}
