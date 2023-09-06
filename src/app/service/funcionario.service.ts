import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IFuncionario } from '../interface/funcionario';
import { IServico } from '../interface/servico';
import { IListaServico } from '../interface/lista_servico';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService {
  private url = '/api/v1/donna'

  constructor(private http: HttpClient, private router: Router) { }

  getFuncionarios() {
    return this.http.get<Array<IFuncionario>>(`${this.url}/funcionario`)
  }

  getServicosPorFuncionario(id:number) {
    return this.http.get<IServico>(`${this.url}/servico/${id}`)
  }

  getListaServico() {
    return this.http.get<Array<IListaServico>>(`${this.url}/servico`)
  }

}
