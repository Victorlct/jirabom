import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Task {
  id: number;
  name: string;
  description: string;
  points: number;
  status: string;
  active: boolean; // Adicionando a propriedade active
}

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    this.loadTasks();
  }

  // carregar tarefas do localStorage
  private loadTasks() {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      this.tasksSubject.next(JSON.parse(storedTasks)); 
    } else {
      this.tasksSubject.next([]); 
    }
  }

  // atualizar tasks no localStorage e no behavior
  private updateTasksInStorage(tasks: Task[]) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }

  // observable - obter tasks
  get tasks$(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  // adicionar nova tarefa
  addTask(task: Task) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = [...currentTasks, task];
    this.updateTasksInStorage(updatedTasks);
  }

  
  editTask(updatedTask: Task) {
    const currentTasks = this.tasksSubject.getValue();
    const taskIndex = currentTasks.findIndex(task => task.id === updatedTask.id);
    if (taskIndex !== -1) {
      currentTasks[taskIndex] = updatedTask;
      this.updateTasksInStorage(currentTasks); 
    }
  }

  // deletar tarefa
  deleteTask(taskId: number) {
    const currentTasks = this.tasksSubject.getValue();
    const updatedTasks = currentTasks.filter(task => task.id !== taskId);
    this.updateTasksInStorage(updatedTasks); 
  }
}
