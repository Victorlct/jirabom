import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { TaskService, Task } from '../services/task.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  todosStatus = ['Em espera', 'Em progresso', 'Bloqueado', 'Concluído'];
  tasks: Task[] = [];
  private tasksSubscription: Subscription = new Subscription();

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.tasksSubscription = this.taskService.tasks$.subscribe((data) => {
      this.tasks = data;
    });
  }

  getTasksByStatus(status: string): Task[] {
    return this.tasks.filter((task) => task.status === status);
  }

  ngOnDestroy() {
    if (this.tasksSubscription) {
      this.tasksSubscription.unsubscribe();
    }
  }
}
