import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService, Task } from '../services/task.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() task!: Task; 
  @Output() deleteTask = new EventEmitter<number>();
  @Output() editTask = new EventEmitter<Task>();

  showEditModal = false;
  showDeleteModal: boolean = false;
  editedTask: Task = { ...this.task };

  constructor(private taskService: TaskService) {}

  // editar a tarefa
  onEdit() {
    this.showEditModal = true;
    this.editedTask = { ...this.task };
  }

  confirmEdit() {
    this.taskService.editTask(this.editedTask);
    this.showEditModal = false;
  }

  cancelEdit() {
    this.showEditModal = false;
  }

  // abrir o modal de exclusão
  onDelete() {
    this.showDeleteModal = true;
  }

  // confirmar exclusão da tarefa
  confirmDelete() {
    this.taskService.deleteTask(this.task.id);
    this.showDeleteModal = false;
  }

  // cancelar a exclusão
  cancelDelete() {
    this.showDeleteModal = false;
  }
}
