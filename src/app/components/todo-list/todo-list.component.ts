import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TodoListService } from './todo-list.service';
import { SnackBarService } from '../snack-bar.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  doneTasks: ITodo[] = [];
  toDoTasks: ITodo[] = [];
  ngb
  constructor(
    private _todoServices: TodoListService,
    private _messageServices: SnackBarService,
  ) { }

  ngOnInit() {
    this._todoServices.getAllTasks().toPromise()
      .then(tasks => {
        tasks.forEach(_task => {
          if (_task.completed)
            this.doneTasks.push(_task)
          else
            this.toDoTasks.push(_task);
        })
      })
  }


  moveTask(task: CdkDragDrop<ITodo[]>) {
    if (task.previousContainer === task.container) {
      moveItemInArray(task.container.data, task.previousIndex, task.currentIndex);
    } else {
      const currentIndex: number = task.currentIndex;
      const isTaskDone: boolean = task.container.data[currentIndex].completed;
      transferArrayItem(task.previousContainer.data,
        task.container.data,
        task.previousIndex,
        task.currentIndex);
      task.container.data[currentIndex].completed = !task.container.data[currentIndex].completed;

      if (isTaskDone) {
        this._messageServices.showMessage('Tarefa Completada');
      }
    }
  }
}
