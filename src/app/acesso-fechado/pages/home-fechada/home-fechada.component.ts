import { Component, OnInit } from '@angular/core';
import { SessaoEnum } from 'src/app/sessao/sessao.enum';
import { ISessao } from 'src/app/sessao/sessao.interface';
import { SessaoService } from 'src/app/sessao/sessao.service';
import { AcessoFechado } from '../../service/acesso-fechado.service';
import { IListaServico } from 'src/app/acesso-aberto/interface/lista_servico';
import { IUsuario } from 'src/app/acesso-login/interface/usuario';
import { IFuncionario } from 'src/app/acesso-aberto/interface/funcionario';
import { NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalPerfilComponent } from '../../components/modal-perfil/modal-perfil.component';
import { horarios } from '../../components/calendario/horarios';
import { IAgendamento } from '../../interface/agendamento';
import { IHorario } from '../../interface/horario';
import { ModalConfirmaAgendamentoComponent } from '../../components/modal-confirma-agendamento/modal-confirma-agendamento.component';

@Component({
  selector: 'app-home-fechada',
  templateUrl: './home-fechada.component.html',
  styleUrls: ['./home-fechada.component.scss'],
})
export class HomeFechadaComponent implements OnInit {
  closeResult: string | undefined;

  sessao!: ISessao;

  funcionario: Array<IFuncionario> = [];

  getFuncionario!: IFuncionario;

  servico: Array<IListaServico> = [];

  getServico!: IListaServico;

  usuario!: IUsuario;



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

  constructor(
    private sessaoService: SessaoService,
    private acessoFechado: AcessoFechado,
    private modalService: NgbModal
  ) {}

  open() {
    const modalRef = this.modalService.open(ModalPerfilComponent, {
      centered: true,
    });
    modalRef.closed.subscribe(() => {
      console.log('Quando clica no OK do modal, a aplicação cai aqui!');
      console.log('Aqui deve ser o código de envio de formulário');
    });
  }

  ngOnInit(): void {
    const dadosSessao: ISessao = {
      idFuncionario: this.sessaoService.buscaSessao(
        SessaoEnum.CHAVE_FUNCIONARIO
      ),
      idServico: this.sessaoService.buscaSessao(SessaoEnum.CHAVE_SERVICO),
      idCliente: this.sessaoService.buscaSessao(SessaoEnum.CHAVE_CLIENTE),
    };
    this.sessao = dadosSessao;
    console.log(this.sessao);

    this.acessoFechado
      .getFuncionario(dadosSessao.idFuncionario!)
      .subscribe((response: IFuncionario) => {
        this.getFuncionario = response;
        this.funcionario.push(response);
        console.log(
          'aqui vai imprimir o funcionário escolhido',
          this.funcionario
        );
      });

    this.acessoFechado
      .getServico(dadosSessao.idServico)
      .subscribe((response: IListaServico) => {
        this.getServico = response;
        this.servico.push(response);
        console.log('aqui vai imprimir o serviço selecionado', this.servico);
      });

    this.acessoFechado
      .getCliente(dadosSessao.idCliente!)
      .subscribe((response: IUsuario) => {
        this.usuario = response;
        console.log('aqui vai imprimir o nome do usuario', this.usuario);
      });

    const idCliente = parseInt(dadosSessao.idCliente!)
    this.listarAgendamento(idCliente)

    //this.acessoFechado
       //.listaTodosOsAgendamentos()
       //.subscribe((response: Array<IAgendamento>) => {
         //this.listaTodosAgendamentos = response;

         //const listaAgendamentoPorFuncionario = this.listaTodosAgendamentos.filter(item => {
           //return dadosSessao.idFuncionario == item.id_funcionario.toString()
         //})

         //listaAgendamentoPorFuncionario.forEach(item => {
           //const pegaHorario = item.horario
         //})
       //});
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
      id_cliente: this.usuario.id,
      nome_cliente: this.usuario.nome,
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
        const verificaServico = this.listaAgendamento.filter((item) => {
          return item.nome_servico == this.agendamento.nome_servico;
        })
        console.log(verificaServico);
        if (verificaServico.length) {
          this.agendamento.id = verificaServico[0].id;
          this.acessoFechado.editarAgendamento(this.agendamento).subscribe(() => {
              this.listarAgendamento(this.agendamento.id_cliente)
              this.alert = true;
              this.mensagem = 'Agendamento alterado com sucesso!';
              setTimeout(() => {
                this.alert = false;
              }, 3000);
          });
        } else {
          this.acessoFechado
            .salvarAgendamento(this.agendamento)
            .subscribe(() => {
              this.listaAgendamento.push(this.agendamento);
              this.alert = true;
              this.mensagem = 'Agendamento realizado com sucesso!';
              setTimeout(() => {
                this.alert = false;
              }, 3000);
            });
        }

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

  listarAgendamento(idCliente: number){
    this.acessoFechado
    .getListarAgendamentos(idCliente)
    .subscribe((response: Array<IAgendamento>) => {
      //this.listaAgendamento = []
      this.listaAgendamento = response;
    });
  }

}

    //   console.log('Quando clica no OK do modal, a aplicação cai aqui!')
    //   console.log('Aqui deve ser o código de envio de formulário')
    // })
    //modificar de acordo com meu modal de confirmação de agendamento
    //criar componente modal

    /**
     * quando clicar na hora colocar opacity nos demais botoes igual as fotos das funcionarias,
     * quando clicar em agendar abrir modal para confirmação: nesse modal emitir método igual ao Open nessa página com outro nome caso ele clique no botao "confirmar".
     * deletar código acima depois de criar modal.
     * apos confirmação aparecer outro componente que mostra os serviços agendados - fazer get http://localhost:3004/agendamento.
     * Criar um botão ou link para novos agendamentos, que deverão redirecionar para tela agendamento do acesso aberto
     * Quando clicar no botão agendar na tela agendamento do acesso aberto, deve verificar primeiro se o id do cliente está na sessão (logado), se tiver, deve direcionar direto para a area fechada /home-fechada, se não, deve direcionar para login
     *
     *
     */
