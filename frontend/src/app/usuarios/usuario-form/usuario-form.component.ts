import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CompaniasRequestsService } from '../../companias/services/companias-requests.service';

@Component({
  selector: 'app-usuario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuario-form.component.html',
})
export class UsuarioFormComponent implements OnInit {
  @Input() initialData: any = null;
  @Output() onSubmit = new EventEmitter<any>();

  form!: FormGroup;
  companias: any[] = [];
  esEdicion: boolean = false;

  constructor(private fb: FormBuilder, private companiasService: CompaniasRequestsService) {}

  async ngOnInit() {
    this.esEdicion = !!this.initialData;
    this.form = this.fb.group({
      nombre: [this.initialData?.nombre || '', Validators.required],
      apellido: [this.initialData?.apellido || '', Validators.required],
      cargo: [this.initialData?.cargo || '', Validators.required],
      salario: [this.initialData?.salario || 0, [Validators.required, Validators.min(0)]],
      telefono: [this.initialData?.telefono || '', Validators.required],
      correo: [this.initialData?.correo || '', [Validators.required, Validators.email]],
      rol: [this.initialData?.rol || 'user', Validators.required],
      companiaId: [this.initialData?.compania?.id || '', Validators.required],
    });

    if (!this.esEdicion) {
      this.form.addControl('password', this.fb.control('', Validators.required));
    }
    const data_companias = await this.companiasService.getAll();
    this.companias = data_companias ?? [];
  }

  submit() {
    if (this.form.valid) {
      const formValue = { ...this.form.value };

      if (!formValue.password) {
        delete formValue.password; // si está vacío, lo eliminamos
      }

      this.onSubmit.emit(formValue);
    }
  }
}
