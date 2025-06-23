import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ToDo, User } from '../../core/models/models';
import { CardComponent } from '../../core/shared/card/card.component';
import { LoaderComponent } from '../../core/shared/loader/loader.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-todos',
  imports: [CardComponent, LoaderComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent implements OnInit {
  apiService = inject(ApiService);
  toDos = signal<ToDo[]>([]);
  userTodossArray = signal<ToDo[]>([]);
  errorMes = signal<string | null>(null);
  isLoading = signal(true);
  id = input.required<string>();
  usersData = signal<User[]>([]);
  user = signal<User | null>(null);

  loadData() {
    forkJoin({
      todos: this.apiService.getData<ToDo[]>('todos'),
      users: this.apiService.getData<User[]>('users'),
    }).subscribe({
      next: ({ todos, users }) => {
        this.toDos.set(todos);
        this.usersData.set(users);
        this.isLoading.set(false);
        let updatedData = this.toDos().filter((todo) => {
          return todo.userId === Number(this.id());
        });
        this.userTodossArray.set(updatedData);
        let selectedUser = this.usersData().filter(
          (user) => user.id === Number(this.id())
        )[0];
        this.user.set(selectedUser);
      },
      error: () => {
        this.errorMes.set('Could not fetch Dara');
        this.isLoading.set(false);
      },
    });
  }

  ngOnInit(): void {
    this.loadData();
  }
}
