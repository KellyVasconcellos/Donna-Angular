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
  private urlFuncionario = 'http://localhost:3000/funcionario'
  private urlServico = 'http://localhost:3001/servico'
  private urlListaServico = 'http://localhost:3002/servicos_lista'

  constructor(private http: HttpClient, private router: Router) { }

  getFuncionarios() {
    return this.http.get<Array<IFuncionario>>(this.urlFuncionario)
  }

  getServicosPorFuncionario(id:number) {
    return this.http.get<Array<IServico>>(`${this.urlServico}?id_funcionario=${id}`)
  }

  getListaServico() {
    return this.http.get<Array<IListaServico>>(this.urlListaServico)
  }

}
