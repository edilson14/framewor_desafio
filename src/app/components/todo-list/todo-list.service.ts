import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  static todoUrl: string = environment.apiUrl + 'todos';

  constructor(private _http: HttpClient) { }


  getAllTasks(): Observable<ITodo[]> {
    return this._http.get<ITodo[]>(TodoListService.todoUrl);
  }
}
