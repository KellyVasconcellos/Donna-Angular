import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFuncionario } from 'src/app/acesso-aberto/interface/funcionario';
import { IListaServico } from 'src/app/acesso-aberto/interface/lista_servico';
import { IUsuario } from 'src/app/acesso-login/interface/usuario';
import { IAgendamento } from '../interface/agendamento';

@Injectable({
  providedIn: 'root'
})

export class AcessoFechado {

  private apiServico = 'http://localhost:3002/servicos_lista';
  private apiUsuario = 'http://localhost:3003/usuario';
  private apiFuncionario = 'http://localhost:3000/funcionario';
  private apiAgendamento = 'http://localhost:3004/agendamento';

  constructor(private http: HttpClient) { }

  getFuncionario(id: string) {
    return this.http.get<IFuncionario>(`${this.apiFuncionario}/${id}`)
  }

  getServico(id: string) {
    return this.http.get<IListaServico>(`${this.apiServico}/${id}`)
  }

  getCliente(id: string) {
    return this.http.get<IUsuario>(`${this.apiUsuario}/${id}`)
  }

  salvarAgendamento(agendamento: IAgendamento) {
    return this.http.post<IAgendamento>(this.apiAgendamento, agendamento)
  }

  getListarAgendamentos(id_cliente:number) {
    return this.http.get<Array<IAgendamento>>(`${this.apiAgendamento}?id_cliente=${id_cliente}`)
  }

  editarAgendamento(agendamento: IAgendamento) {
    return this.http.put<IAgendamento>(`${this.apiAgendamento}/${agendamento.id}`, agendamento)
  }

  listaTodosOsAgendamentos() {
    return this.http.get<Array<IAgendamento>>(this.apiAgendamento)
  }
}
