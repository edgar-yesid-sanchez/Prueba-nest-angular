import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UbicacionService } from '../../core/ubicacion.service';

@Component({
  selector: 'app-compania-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './compania-form.component.html',
})
export class CompaniaFormComponent implements OnInit {
  @Input() initialData: any = null;
  @Output() onSubmit = new EventEmitter<any>();

  form!: FormGroup;

  departamentos: any[] = [];
  ciudades: any[] = [];
  loading = false;
  
  constructor(
    private fb: FormBuilder,
    private ubicacionService: UbicacionService
  ) {}
  async ngOnInit() {
    this.form = this.fb.group({
      nombre: [this.initialData?.nombre || '', Validators.required],
      sector: [this.initialData?.sector || '', Validators.required],
      telefono: [this.initialData?.telefono || '', Validators.required],
      direccion: [this.initialData?.direccion || '', Validators.required],
      activos: [this.initialData?.activos || '', [Validators.required, Validators.min(0)]],
      pasivos: [this.initialData?.pasivos || '', [Validators.required, Validators.min(0)]],
      departamentoId: [this.initialData?.departamento?.id || '', Validators.required],
      ciudadId: [this.initialData?.ciudad?.id || '', Validators.required],
    });
  
    await this.loadDepartamentos();
  
    if (this.initialData?.departamento?.id) {
      await this.loadCiudades(this.initialData.departamento.id);
    }
  
    this.form.get('departamentoId')?.valueChanges.subscribe(async (id) => {
      await this.loadCiudades(id);
      this.form.get('ciudadId')?.reset();
    });
  }
  
  async loadDepartamentos() {
    try {
      this.departamentos = await this.ubicacionService.getDepartamentos();
    } catch (err) {
      console.error('Error al cargar departamentos', err);
    }
  }
  
  async loadCiudades(departamentoId: number) {
    try {
      this.ciudades = await this.ubicacionService.getCiudadesByDepartamento(departamentoId);
    } catch (err) {
      console.error('Error al cargar ciudades', err);
    }
  }
  
  submit() {
    if (this.form.valid) {
      this.onSubmit.emit(this.form.value);
    }
  }
}
