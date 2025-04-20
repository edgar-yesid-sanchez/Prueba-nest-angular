import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductosRequestsService } from '../services/productos-requests.service';
import { CompaniasRequestsService } from '../../companias/services/companias-requests.service';

@Component({
  selector: 'app-producto-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './producto-form.component.html',
})
export class ProductoFormComponent implements OnInit {
  @Input() initialData: any = null;
  @Output() onSubmit = new EventEmitter<any>();

  form!: FormGroup;
  companias: any[] = [];

  constructor(
    private fb: FormBuilder,
    private companiasService: CompaniasRequestsService
  ) {}

  async ngOnInit() {
    this.form = this.fb.group({
      nombre: [this.initialData?.nombre || '', Validators.required],
      categoria: [this.initialData?.categoria || '', Validators.required],
      precio: [this.initialData?.precio || '', [Validators.required, Validators.min(0)]],
      companiaId: [this.initialData?.compania?.id || '', Validators.required],
    });

    const data_companias = await this.companiasService.getAll();
    this.companias = data_companias ?? []
  }

  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
