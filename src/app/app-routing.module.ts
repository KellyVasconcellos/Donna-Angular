import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { HomeFechadaComponent } from './pages/home-fechada/home-fechada.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateHomeComponent,
    children: [
      {
        path: '',
        component: AgendamentoComponent,
      },
      {
        path: 'agendamento',
        component: AgendamentoComponent,
      },
      {
        path: 'teste',
        component: HomeFechadaComponent,
      },
    ],
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
