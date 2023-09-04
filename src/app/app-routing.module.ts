import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';

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
