import { Component, inject, input,  OnInit, signal } from '@angular/core';
import { Post, User } from '../../core/models/models';
import { ApiService } from '../../core/services/api.service';
import { CardComponent } from '../../core/shared/card/card.component';
import { LoaderComponent } from '../../core/shared/loader/loader.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-user-posts',
  imports: [CardComponent, LoaderComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss',
})
export class UserPostsComponent implements OnInit {
  apiService = inject(ApiService);
  posts = signal<Post[]>([]);
  userPostsArray = signal<Post[]>([]);
  errorMes = signal<string | null>(null);
  isLoading = signal(true);
  id = input.required<string>();
  usersData = signal<User[]>([]);
  user = signal<User | null>(null);

  loadData() {
    forkJoin({
      posts: this.apiService.getData<Post[]>('posts'),
      users: this.apiService.getData<User[]>('users'),
    }).subscribe({
      next: ({ posts, users }) => {
        this.posts.set(posts);
        this.usersData.set(users);
        this.isLoading.set(false);
        let updatedData = this.posts().filter((post) => {
          return post.userId === Number(this.id());
        });
        this.userPostsArray.set(updatedData);
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
