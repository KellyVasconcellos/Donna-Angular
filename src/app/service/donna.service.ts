import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFuncionario } from '../interface/funcionario';
import { IServico } from '../interface/servico';
import { IListaServico } from '../interface/lista_servico';
import { Router } from '@angular/router';
import { IAgendamento } from '../interface/agendamento';
import { IAgendamentoResponse } from '../interface/agendamentoResponse';
import { IEditarAgendamento } from '../interface/editarAgendamento';

@Injectable({
  providedIn: 'root'
})
export class DonnaService {
  private url = '/api/v1/donna'

  constructor(private http: HttpClient, private router: Router) { }

  listaFuncionarios() {
    return this.http.get<Array<IFuncionario>>(`${this.url}/funcionario`)
  }

  listaServicosPorFuncionario(id:number) {
    return this.http.get<IServico>(`${this.url}/servico/getServFunc/${id}`)
  }

  listaServicos() {
    return this.http.get<Array<IListaServico>>(`${this.url}/servico`)
  }

  getFuncionario(id: string) {
    return this.http.get<IFuncionario>(`${this.url}/funcionario/${id}`)
  }

  getServico(id: string) {
    return this.http.get<IListaServico>(`${this.url}/servico/${id}`)
  }

  salvarAgendamento(agendamento: IAgendamento) {
    return this.http.post<IAgendamentoResponse>(`${this.url}/agendamento`, agendamento)
  }

  salvarSessao(chave: string, valor: string){
    sessionStorage.setItem(chave, valor)
  }

  buscaSessao(chave: string): string {
    return sessionStorage.getItem(chave) || ''
  }

  editarAgendamento(agendamento: IEditarAgendamento) {
    return this.http.put<IAgendamentoResponse>(`${this.url}/agendamento/editar`, agendamento)
  }

  deletarAgendamento(id: string){
    return this.http.delete<any>(`${this.url}/agendamento/${id}`)
  }

}
