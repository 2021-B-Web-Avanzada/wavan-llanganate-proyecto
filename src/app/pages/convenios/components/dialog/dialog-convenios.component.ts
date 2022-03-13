import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {  Convenio } from '../../interfaces/convenio.interface';
import { ConvenioService } from '../../services/convenio.service';

@Component({
  selector: 'app-dialog-library',
  templateUrl: './dialog-convenios.component.html',
  styleUrls: ['./dialog-convenios.component.sass']
})
export class DialogLibraryComponent implements OnInit {

  title : String = ""
  form = new FormGroup({
    nombre: new FormControl(),
    encargado: new FormControl(),
    url: new FormControl(),
    periodo: new FormControl(),
    descripcion: new FormControl(),
    empresa: new FormControl(),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    private service: ConvenioService,
    @Inject(MAT_DIALOG_DATA) public editData : any,
    private dialogRef: MatDialogRef<DialogLibraryComponent>,
  ) { }

  ngOnInit(): void {
    console.log(this.editData);
    this.initForm();
    if(this.editData){
      this.title= "Editar";
    }else{
      this.title="Crear"
    }
  }

  async onSubmit() {
    await this.create(this.form.value);
  }

  async create(obj: Convenio) {
    const response = await this.service.post(obj);
    if (response.error) {
      this.toastService.error(response.error + "");
    }else{
      this.toastService.info('Se ha creado exitosamente una nueva bibliteca');
      this.form.reset();
      this.dialogRef.close('create');
    }
  }

  private initForm(): void {
    this.form = this.fb.group(
      {
        nombre: ['', Validators.required],
        encargado: ['', Validators.required],
        url: ['', Validators.required],
        periodo: ['', Validators.required],
        descripcion: ['', Validators.required],
        empresa: ['', Validators.required],
      }
    );
    if(this.editData){
      this.form.controls['nombre'].setValue(this.editData.nombre);
      this.form.controls['encargado'].setValue(this.editData.encargado);
      this.form.controls['url'].setValue(this.editData.url);
      this.form.controls['periodo'].setValue(this.editData.periodo);
      this.form.controls['descripcion'].setValue(this.editData.descripcion);
      this.form.controls['empresa'].setValue(this.editData.empresa);

    }
  }

}
