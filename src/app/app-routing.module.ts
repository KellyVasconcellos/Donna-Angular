import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoComponent } from './acesso-aberto/pages/agendamento/agendamento.component';
import { ContatoComponent } from './acesso-aberto/pages/contato/contato.component';
import { HomeComponent } from './acesso-aberto/pages/home/home.component';
import { ServicosComponent } from './acesso-aberto/pages/servicos/servicos.component';
import { SobreComponent } from './acesso-aberto/pages/sobre/sobre.component';
import { TemplateHomeComponent } from './acesso-aberto/pages/template-home/template-home.component';
import { AreaLogadaComponent } from './acesso-login/view/area-logada/area-logada.component';
import { CadastrarComponent } from './acesso-login/view/cadastrar/cadastrar.component';
import { LoginComponent } from './acesso-login/view/login/login.component';
import { HomeFechadaComponent } from './acesso-fechado/pages/home-fechada/home-fechada.component';
import { SessaoService } from './sessao/sessao.service';
import { guard } from './sessao/sessao.guard';

const routes: Routes = [
  {
    path: '',
    component: TemplateHomeComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'contato',
        component: ContatoComponent,
      },
      {
        path: 'agendamento',
        component: AgendamentoComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'servicos',
        component: ServicosComponent,
      },
      {
        path: 'sobre',
        component: SobreComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'cadastrar',
        component: CadastrarComponent,
      },
      {
        path: 'area-logada',
        component: AreaLogadaComponent,
      },
    ],
  },
  {
    path: 'home-fechada',
    providers: [SessaoService],
    canMatch: [guard],
    component: HomeFechadaComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled',
    scrollOffset: [0, 80]
  })
],
  exports: [RouterModule],
})
export class AppRoutingModule {}
