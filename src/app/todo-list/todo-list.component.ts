import { Component, OnInit } from '@angular/core';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  currentTodoList;
  taskSubscription;
  constructor(private tk: TasksService) { }

  ngOnInit() {
    this.taskSubscription = this.tk.tasks.subscribe(tasks => {this.currentTodoList = tasks;console.log(tasks)});
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }

  removeTask(id) {
    this.currentTodoList[id] = null;
    var tempList = this.currentTodoList
    this.tk.updateTasks(tempList);
  }

}
