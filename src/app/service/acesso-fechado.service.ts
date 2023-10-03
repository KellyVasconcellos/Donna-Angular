import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAgendamento } from '../interface/agendamento';
import { IFuncionario } from '../interface/funcionario';
import { IListaServico } from '../interface/lista_servico';

@Injectable({
  providedIn: 'root'
})

export class AcessoFechado {

  private apiServico = 'http://localhost:3002/servicos_lista';
  private apiFuncionario = 'http://localhost:3000/funcionario';
  private apiAgendamento = 'http://localhost:3004/agendamento';

  constructor(private http: HttpClient) { }

  getFuncionario(id: string) {
    return this.http.get<IFuncionario>(`${this.apiFuncionario}/${id}`)
  }

  getServico(id: string) {
    return this.http.get<IListaServico>(`${this.apiServico}/${id}`)
  }

  salvarAgendamento(agendamento: IAgendamento) {
    return this.http.post<IAgendamento>(this.apiAgendamento, agendamento)
  }
}
