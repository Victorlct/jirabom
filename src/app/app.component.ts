import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TaskService, Task } from './services/task.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, DashboardComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'JiraJira';

  todosStatus = ['Em espera', 'Em progresso', 'Bloqueado', 'Concluído'];
  showAddTaskForm = false;

  newTask: Partial<Task> = {
    name: '',
    description: '',
    points: 0,
    status: 'Em espera',
    active: true,
  };

  constructor(private taskService: TaskService) {}

  openAddTaskForm() {
    this.showAddTaskForm = true;
  }

  closeAddTaskForm() {
    this.showAddTaskForm = false;
    this.resetNewTask();
  }

  addTask() {
    if (this.newTask.name && this.newTask.description && this.newTask.points && this.newTask.status) {
      const newTask: Task = {
        id: Math.floor(Math.random() * 10000),
        name: this.newTask.name as string,
        description: this.newTask.description as string,
        points: this.newTask.points as number,
        status: this.newTask.status as string,
        active: true,
      };
  
      this.taskService.addTask(newTask);
      this.closeAddTaskForm();
    } else {
      console.error('Preencha todos os campos para adicionar uma nova task.');
    }
  }
  
  resetNewTask() {
    this.newTask = {
      name: '',
      description: '',
      points: 0,
      status: 'Em espera',
      active: true,
    };
  }
}
