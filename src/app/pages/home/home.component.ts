import { Component, OnInit } from '@angular/core';
import { IHorario } from '../../interface/horario';
import { DiaHorarioEnum } from '../../enum/diaHorario';
import { IFuncionario } from '../../interface/funcionario';
import { IServico, IServicos } from '../../interface/servico';
import { IListaServico } from '../../interface/lista_servico';
import { Router } from '@angular/router';
import { DonnaService } from 'src/app/service/donna.service';
import { SessaoEnum } from 'src/app/enum/sessao.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  idProfissional!: number;

  numero = 1;

  funcionarios: Array<IFuncionario> = [];
  servicos: Array<IServicos> = [];
  listaServico: Array<IListaServico> = [];
  ihorario!: IHorario;

  profissionais = [];

  panels = ['First'];

  constructor(
    private donnaService: DonnaService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.donnaService
      .listaFuncionarios()
      .subscribe((resposta: Array<IFuncionario>) => {
        this.funcionarios = resposta;
      });

    this.donnaService
      .listaServicos()
      .subscribe((resposta: Array<IListaServico>) => {
        this.listaServico = resposta;
      });

    this.pegaDiaAtual();
  }

  getIdFuncionario(id: number): void {
    this.idProfissional = id
    this.donnaService
      .listaServicosPorFuncionario(id)
      .subscribe((resposta: IServico) => {
        this.servicos = resposta.servicos;
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
    this.donnaService.salvarSessao(SessaoEnum.CHAVE_FUNCIONARIO,this.idProfissional.toString())
    this.donnaService.salvarSessao(SessaoEnum.CHAVE_SERVICO,idServico.toString())
    this.router.navigateByUrl("/agendamento")
  }
}
