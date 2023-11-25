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
import { ImodalConfirmacao } from 'src/app/interface/modal_confirm';
import { IAgendamentoResponse } from 'src/app/interface/agendamentoResponse';
import { IAgendamentoResposta } from 'src/app/interface/agendamentoResposta';
import { ModalEditarComponent } from 'src/app/components/modal-editar/modal-editar.component';
import { IEditarAgendamento } from 'src/app/interface/editarAgendamento';
import { Subject } from 'rxjs';

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

  responseAgendamento!: IAgendamentoResponse;

  deletarTabela = true;

  data_subject = new Subject<string>()
  data_cliente = ''

  constructor(
    private donnaService: DonnaService,
    private modalService: NgbModal,
    private _modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.idFuncionario = this.donnaService.buscaSessao(
      SessaoEnum.CHAVE_FUNCIONARIO
    );
    this.idServico = this.donnaService.buscaSessao(SessaoEnum.CHAVE_SERVICO);

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


      this.data_subject.subscribe((res: any) => this.data_cliente = res)
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

    let nomeCliente: HTMLSelectElement =
      document.querySelector('#nomeClienteId')!;

    let emailCliente: HTMLSelectElement =
      document.querySelector('#emailClienteId')!;

    const agendamento: IAgendamento = {
      nome_cliente: nomeCliente.value,
      email_cliente: emailCliente.value,
      data: `${horario.dia} - ${horario.horario}`,
      id_servico: this.getServico.id.toString(),
      id_funcionario: this.getFuncionario.id.toString(),
    };

    this.agendamento = agendamento;

    const modalCofirmar: ImodalConfirmacao = {
      nome_cliente: this.agendamento.nome_cliente,
      email_cliente: this.agendamento.email_cliente,
      data: this.agendamento.data,
      nome_servico: this.getServico.titulo,
      nome_funcionario: this.getFuncionario.nome,
    };

    modalRef.componentInstance.agendamento = modalCofirmar;

    modalRef.closed.subscribe(() => {
      console.log(this.agendamento);
      if (
        this.agendamento.nome_cliente.length > 0 &&
        this.agendamento.email_cliente.length > 0 &&
        this.agendamento.data.length > 0 &&
        this.agendamento.id_servico.length > 0 &&
        this.agendamento.id_funcionario.length > 0
      ) {
        this.donnaService
          .salvarAgendamento(this.agendamento)
          .subscribe((response: IAgendamentoResponse) => {
            this.alert = true;
            this.mensagem = 'Agendamento realizado com sucesso!';
            setTimeout(() => {
              this.alert = false;
            }, 3000);
            this.responseAgendamento = response;
            this.data_subject.next(response.agendamento.data)
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

  modalEditar(item: IAgendamentoResposta) {
    const modal = this._modalService.open(ModalEditarComponent, {
      centered: true,
    });
    modal.componentInstance.nome = item.nome_cliente;
    modal.componentInstance.email = item.email_cliente;
    modal.componentInstance.data = item.data;

    modal.closed.subscribe((resposta) => {
      console.log(resposta);
      const agendamento: IEditarAgendamento = {
        id: item.id,
        data: resposta.data,
      };

      this.donnaService.editarAgendamento(agendamento).subscribe(() => {
        this.data_subject.next(agendamento.data)
        this.alert = true;
        this.mensagem = 'Agendamento alterado com sucesso!';
        setTimeout(() => {
          this.alert = false;
        }, 3000);
      });
    });
  }

  deletar(id: string) {
    this.donnaService.deletarAgendamento(id).subscribe(() => {
      this.alert = true;
      this.mensagem = 'Agendamento deletado com sucesso!';
      setTimeout(() => {
        this.alert = false;
      }, 3000);
      this.deletarTabela = false;
    });
  }
}
