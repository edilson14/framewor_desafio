import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule, MatIconModule, MatInputModule,
  MatMenuModule, MatPaginatorModule, MatSortModule,
  MatDialogModule, MatTableModule, MatCardModule, MatSnackBarModule,
} from '@angular/material';
import { NgbCarouselModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


import { DragDropModule } from '@angular/cdk/drag-drop';



// COMPONENTES
import { PostsTableComponent } from './posts-table/posts-table.component';
import { AlbunsComponent } from './albuns/albuns.component';
import { TodoListComponent } from './todo-list/todo-list.component';
// SERVICES
import { PostsTableService } from './posts-table/posts-table.service';
import { TodoListService } from './todo-list/todo-list.service';
import { SnackBarService } from './snack-bar.service';
import { FormsModule } from '@angular/forms';

const allComponents = [PostsTableComponent, AlbunsComponent, TodoListComponent];
const allServices = [PostsTableService, TodoListService, SnackBarService];


@NgModule({
  declarations: allComponents,
  exports: allComponents,
  imports: [
    CommonModule,
    MatMenuModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatDialogModule,
    MatCardModule,
    DragDropModule,
    MatSnackBarModule,
    NgbModalModule,
    NgbCarouselModule,
    FormsModule,
  ],
  providers: allServices,
})
export class ComponentsModule { }
