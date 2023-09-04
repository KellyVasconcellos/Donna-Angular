import { Injectable } from '@angular/core';
import { SessaoEnum } from './sessao.enum';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor() { }

  validaSessaoCliente():boolean {
    let sessao = sessionStorage.getItem(SessaoEnum.CHAVE_CLIENTE);

    if (sessao == null || sessao == undefined) {
      return false
    }
    return true
  }

  salvarSessao(chave: string, valor: string){
    sessionStorage.setItem(chave, valor)
  }

  buscaSessao(chave: string): string {
    return sessionStorage.getItem(chave) || ''
  }

  limparSessao(){
    sessionStorage.clear()
  }

  /*
  private sessionSubject = new BehaviorSubject<ISessao | null>(null)
  salvarSessaoSubject(iSessao: ISessao){
    this.sessionSubject.next(iSessao);
  }

  buscaSessaoSubject() {
    return this.sessionSubject.asObservable();
  }*/
}
