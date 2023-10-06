import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { horarios } from '../../components/calendario/horarios';
import { IAgendamento } from '../../interface/agendamento';
import { IHorario } from '../../interface/horario';
import { ModalConfirmaAgendamentoComponent } from '../../components/modal-confirma-agendamento/modal-confirma-agendamento.component';
import { IFuncionario } from 'src/app/interface/funcionario';
import { IListaServico } from 'src/app/interface/lista_servico';
import { DonnaService } from 'src/app/service/donna.service';
import { SessaoEnum } from 'src/app/enum/sessao.enum';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.scss'],
})
export class AgendamentoComponent implements OnInit {
  closeResult: string | undefined;

  funcionario: Array<IFuncionario> = [];

  getFuncionario!: IFuncionario;

  servico: Array<IListaServico> = [];

  getServico!: IListaServico;

  horarios = horarios;

  apareceBotoes = false;

  pegaHorario: string = '';

  agendamento!: IAgendamento;

  pegaCalendario!: NgbDate;

  alert = false;

  alertDanger = false;

  mensagem = '';

  mensagemDanger = '';

  listaAgendamento: Array<IAgendamento> = [];

  listaTodosAgendamentos: Array<IAgendamento> = [];

  idFuncionario: string = '';

  idServico: string = '';

  constructor(
    private donnaService: DonnaService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {

    this.idFuncionario = this.donnaService.buscaSessao(SessaoEnum.CHAVE_FUNCIONARIO)
    this.idServico = this.donnaService.buscaSessao(SessaoEnum.CHAVE_SERVICO)

    this.donnaService
      .getFuncionario(this.idFuncionario)
      .subscribe((response: IFuncionario) => {
        this.getFuncionario = response;
        this.funcionario.push(response);
        console.log(
          'aqui vai imprimir o funcionário escolhido',
          this.funcionario
        );
      });

    this.donnaService
      .getServico(this.idServico)
      .subscribe((response: IListaServico) => {
        this.getServico = response;
        this.servico.push(response);
        console.log('aqui vai imprimir o serviço selecionado', this.servico);
      });
  }

  gethorario(horario: string) {
    this.pegaHorario = horario;
  }

  pegaDataSelecionada(calendario: NgbDate) {
    this.pegaCalendario = calendario;
    this.apareceBotoes = true;
  }

  agendar() {
    const modalRef = this.modalService.open(ModalConfirmaAgendamentoComponent, {
      centered: true,
    });

    const pegaData = `${this.pegaCalendario.day}/${this.pegaCalendario.month}/${this.pegaCalendario.year}`;
    const horario: IHorario = {
      dia: pegaData.trim(),
      horario: this.pegaHorario,
    };

    const idAgendamento = Math.floor(Date.now() * Math.random());

    const agendamento: IAgendamento = {
      id: idAgendamento,
      id_funcionario: this.getFuncionario.id,
      nome_funcionario: this.getFuncionario.nome,
      id_cliente:1,
      nome_cliente: "",
      id_servico: this.getServico.id,
      nome_servico: this.getServico.titulo,
      horario: horario,
    };

    this.agendamento = agendamento;

    modalRef.componentInstance.agendamento = this.agendamento;

    modalRef.closed.subscribe(() => {
      console.log(this.agendamento);
      if (
        this.agendamento.id_funcionario != null &&
        this.agendamento.nome_funcionario.length > 0 &&
        this.agendamento.id_servico != null &&
        this.agendamento.nome_servico.length > 0 &&
        this.agendamento.horario.dia.length > 0 &&
        this.agendamento.horario.horario.length > 0
      ) {
        this.donnaService
        .salvarAgendamento(this.agendamento)
        .subscribe(() => {
          this.listaAgendamento.push(this.agendamento);
          this.alert = true;
          this.mensagem = 'Agendamento realizado com sucesso!';
          setTimeout(() => {
            this.alert = false;
          }, 3000);
        });

      } else {
        this.alertDanger = true;
        this.mensagemDanger =
          'Não foi possível finalizar o agendamento, favor selecionar todos os itens (dia e horário)';
        setTimeout(() => {
          this.alertDanger = false;
        }, 3000);
      }
    });
  }
}
