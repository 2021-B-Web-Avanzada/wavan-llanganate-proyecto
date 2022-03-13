import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-dialog-library',
  templateUrl: './dialog-empresa.component.html',
  styleUrls: ['./dialog-empresa.component.sass']
})
export class DialogLibraryComponent implements OnInit {

  title : String = ""
  form = new FormGroup({
    nombres: new FormControl(),
    apellidos: new FormControl(),
    codigo: new FormControl(),
    telefono: new FormControl(),
    ci: new FormControl(),
    email: new FormControl(),
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly toastService: ToastrService,
    private service: EstudianteService,
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

  async create(obj: Estudiante) {
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
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        codigo: ['', Validators.required],
        telefono: ['', Validators.required],
        email: ['', Validators.required],
        ci: ['', Validators.required],
      }
    );
    if(this.editData){
      this.form.controls['nombres'].setValue(this.editData.nombres);
      this.form.controls['apellidos'].setValue(this.editData.apellidos);
      this.form.controls['codigo'].setValue(this.editData.codigo);
      this.form.controls['telefono'].setValue(this.editData.telefono);
      this.form.controls['email'].setValue(this.editData.email);
      this.form.controls['ci'].setValue(this.editData.ci);
    }
  }

}
