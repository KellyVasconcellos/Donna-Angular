import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { AgendamentoComponent} from './pages/agendamento/agendamento.component';

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
