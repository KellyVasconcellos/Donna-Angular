import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { JsonPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { AccordionsComponent } from './components/accordions/accordions.component';
import { FooterComponent } from './components/footer/footer.component';
import { ListaServicoComponent } from './components/lista-servico/lista-servico.component';
import { ProfissionaisComponent } from './components/profissionais/profissionais.component';
import { HomeComponent } from './pages/home/home.component';
import { TemplateHomeComponent } from './pages/template-home/template-home.component';
import { CalendarioComponent } from './components/calendario/calendario.component';
import { AgendamentoComponent } from './pages/agendamento/agendamento.component';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TemplateHomeComponent,
        FooterComponent,
        ProfissionaisComponent,
        AccordionsComponent,
        ListaServicoComponent,
        CalendarioComponent,
        AgendamentoComponent

    ],
    providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbAccordionModule,
        NgbDatepickerModule,
        FormsModule,
        JsonPipe,
    ]
})
export class AppModule {}
