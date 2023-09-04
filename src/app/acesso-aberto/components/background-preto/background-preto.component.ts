import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-background-preto',
  templateUrl: './background-preto.component.html',
  styleUrls: ['./background-preto.component.scss']
})
export class BackgroundPretoComponent {

  @Input() primeiraImagem: string = ""
  @Input() segundaImagem: string = ""
  @Input() terceiraImagem: string = ""
  @Input() textoBotao: string =""

}
