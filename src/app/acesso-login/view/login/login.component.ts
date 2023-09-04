import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { SessaoService } from 'src/app/sessao/sessao.service';
import { SessaoEnum } from 'src/app/sessao/sessao.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogar! : FormGroup;
  mensagemErro = "";
  submetido = false;

  constructor(
    private fb: FormBuilder,
    private service: LoginService,
    private router: Router,
    private sessao: SessaoService
  ) { }

  ngOnInit(): void {
    this.formLogar = this.fb.group({
      email: ['',[ Validators.required]],
      senha: ['', [Validators.required]]
    })
  }

  btnInscrever(){
    this.router.navigateByUrl("/cadastrar")
  }

  logar():void {
    this.submetido = true
    if (this.formLogar.valid){
      const form = this.formLogar.value
      this.service.login(form.email).subscribe((resposta : any) => {
        if (resposta.length) {
          if (resposta[0].senha === form.senha) {
            this.sessao.salvarSessao(SessaoEnum.CHAVE_CLIENTE, resposta[0].id.toString())
            this.router.navigateByUrl("/home-fechada")
          } else {
            this.mensagemErro = "Usuário ou Senha inválida"
          }
        } else {
          this.mensagemErro = "Usuário ou Senha inválida"
        }
      })
    }
  }
}


