import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.scss']
})
export class ModalEditarComponent implements OnInit {

  @Input() nome = ''
  @Input() email = ''
  @Input() data = ''

  formEditar! : FormGroup;
  mensagemErro = "";
  submetido = false;

  constructor(
    public modal: NgbActiveModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formEditar = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['',[ Validators.required]],
      data: ['', [Validators.required]]
    })

    this.formEditar.get('nome')?.setValue(this.nome);
    this.formEditar.get('email')?.setValue(this.email);
    this.formEditar.get('data')?.setValue(this.data);
  }

  editar():void {
    console.log(this.formEditar.controls)
    this.submetido = true
    if (this.formEditar.valid){
      const form = this.formEditar.value
      const usuario: any = {
        nome: form.nome,
        email: form.email,
        data: form.data
      }
      this.modal.close(usuario)
    }
  }

}
