import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LibrariesRoutingModule } from './libraries-routing.module';
import { LibrariesComponent } from './libraries.component';
import {  EmpresaTableComponent } from './components/library-table/empresa-table.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogLibraryComponent } from './components/dialog/dialog-empresa.component';
import {MatDialogModule} from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LeftNavComponent } from '@home/components/left-nav/left-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { HomeModule } from '@home/home.module';


@NgModule({
  declarations: [
    LibrariesComponent,
    EmpresaTableComponent,
    DialogLibraryComponent
  ],
  imports: [
    CommonModule,
    LibrariesRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    HomeModule,
    MatSidenavModule
  ]
})
export class LibrariesModule { }
