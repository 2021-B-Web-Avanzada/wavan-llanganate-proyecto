import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Empresa } from '../../interfaces/empresa.interface';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-dialog-library',
  templateUrl: './dialog-empresa.component.html',
  styleUrls: ['./dialog-empresa.component.sass']
})
export class DialogLibraryComponent implements OnInit {

  title : String = ""
  form = new FormGroup({
    nombre: new FormControl(),
    ruc: new FormControl(),
    email: new FormControl(),
    representante: new FormControl(),
    telefono: new FormControl(),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    private service: EmpresaService,
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

  async create(obj: Empresa) {
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
        ruc: ['', Validators.required],
        email: ['', Validators.required],
        representante: ['', Validators.required],
        telefono: ['', Validators.required],
      }
    );
    if(this.editData){
      this.form.controls['nombre'].setValue(this.editData.nombre);
      this.form.controls['ruc'].setValue(this.editData.ruc);
      this.form.controls['email'].setValue(this.editData.email);
      this.form.controls['representante'].setValue(this.editData.representante);
      this.form.controls['telefono'].setValue(this.editData.telefono);
    }
  }

}
