import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.css']
})
export class TodoFormComponent implements OnInit {

  taskForm;
  currentTasks;
  taskSubscription;
  currentIndex;

  constructor(private fb: FormBuilder, private tk: TasksService) { 
    this.taskForm = this.fb.group({
      title : '',
      timer : 100,
    });
  }

  ngOnInit() {
    this.taskSubscription = this.tk.tasks.subscribe(todos => this.currentTasks = todos);
    this.currentIndex = -1;
  }

  ngOnDestroy(){
    this.taskSubscription.unsubscribe();
  }

  removeTask(id) {
    this.currentTasks[id] = null;
    var tempList = this.currentTasks
    this.tk.updateTasks(tempList);
  }

  addTask(taskData) {
    this.currentIndex = this.currentTasks.length;
    var tempTaskData = taskData;
    tempTaskData.id = this.currentIndex;
    var tempTasks = this.currentTasks;
    tempTasks.push(tempTaskData);
    this.tk.updateTasks(tempTasks);
    setTimeout(() => {
      alert("Time has run out for "+tempTaskData.title);
      this.removeTask(tempTaskData.id);
    }, taskData.timer*1000);
    this.taskForm.reset();
  }

}
