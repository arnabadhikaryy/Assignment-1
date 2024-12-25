import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgClass, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common'; // Import CommonModule

export interface TodoItem {
  id: number;
  task: string;
  completed: boolean;
  isEditing: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterOutlet, NgFor, NgClass, CommonModule, FormsModule], // Add CommonModule and FormsModule
})
export class AppComponent {
  todoList: TodoItem[] = [];
  newTask: string = '';
  @ViewChild('todoText') todoInputRef: ElementRef<HTMLInputElement> = null!;

  ngOnInit(): void {
    // Check if the environment is a browser
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTodoList = localStorage.getItem('todoList');
      if (storedTodoList) {
        this.todoList = JSON.parse(storedTodoList);
      }
    }
  }
  

  addTask(text: string): void {
    if (text.trim() !== '') {
      const newTodoItem: TodoItem = {
        id: Date.now(),
        task: text.trim(),
        completed: false,
        isEditing: false,
      };
      this.todoList.push(newTodoItem);
      this.todoInputRef.nativeElement.value = '';
      this.saveTodoList();
    }
  }

  deleteTask(id: number): void {
    this.todoList = this.todoList.filter(item => item.id !== id);
    this.saveTodoList();
  }

  toggleCompleted(id: number): void {
    const todoItem = this.todoList.find(item => item.id === id);
    if (todoItem) {
      todoItem.completed = !todoItem.completed;
      this.saveTodoList();
    }
  }

  // Start editing the task
  startEditing(todoItem: TodoItem): void {
    todoItem.isEditing = true;
  }

  // Save the edited task
  saveEdit(todoItem: TodoItem): void {
    todoItem.isEditing = false;
    this.saveTodoList();
  }

  // Save the updated todo list to localStorage
  saveTodoList(): void {
    localStorage.setItem('todoList', JSON.stringify(this.todoList));
  }
}
