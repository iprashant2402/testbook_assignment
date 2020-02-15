import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  private tasksSource = new BehaviorSubject<any[]>([]);
  tasks = this.tasksSource.asObservable();
  constructor() { }

  updateTasks(tasks: any[]){
    this.tasksSource.next(tasks);
  }
  
}
