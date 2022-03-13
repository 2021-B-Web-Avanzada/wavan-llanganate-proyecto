import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogLibraryComponent } from '../dialog/dialog-empresa.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { Estudiante } from '../../interfaces/estudiante.interface';
import { EstudianteService } from '../../services/estudiante.service';
import { OPTIONS } from 'src/app/shared/constants/constant';

@Component({
  selector: 'app-library-table',
  templateUrl: './estudiante-table.component.html',
  styleUrls: ['./estudiante-table.component.sass']
})
export class EmpresaTableComponent implements OnInit {

  displayedColumns: string[] = OPTIONS.estudiantesCarnetizados.labels;

  dataSource!: MatTableDataSource<any>;

  data!: Estudiante[] | null ;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog : MatDialog,
    private service: EstudianteService,
    private toastrService: ToastrService,
  ) { }

  ngOnInit(): void {
    this.getAllLibraries();
  }

  openDialog(){
    this.dialog.open(DialogLibraryComponent, {
        width: '30%',
    }).afterClosed().subscribe(
      val => {
        if(val==='create'){
          this.getAllLibraries();
        }
      }
    )
  }

  async getAllLibraries(){
    const response = await this.service.get();
    this.data = response.data;
    if(this.data !== null){
      this.dataSource = new MatTableDataSource(this.data);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    }
    console.log(this.data);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  editLibrary(row: Estudiante){
    this.dialog.open(DialogLibraryComponent,{
      width: '30%',
      data: row,
    }).afterClosed().subscribe( val => {
      if(val==='edit'){
        this.getAllLibraries();
      }
    })
  }

  async onDelete(row: Estudiante){
    const response = await this.service.delete(row.id!);
    if(response.error){
      this.toastrService.error(response.error+"");
    }else{
      this.toastrService.success("Se ha eliminado correctamente la librería");
      this.getAllLibraries();
    }
  }
}
