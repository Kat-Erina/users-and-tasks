import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Post, User } from '../../core/models/models';
import { StateService } from '../../core/services/state.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
apiService=inject(ApiService);
stateService=inject(StateService)
postsData=this.stateService.postsData
usersData=this.stateService.usersData
postsArrayWithUserName=signal<{ title: string; username: string, id:number }[] >([]) ;

loadData(){
this.apiService.getData<Post[]>('posts').subscribe({
  next:()=>{
      forkJoin({
    posts: this.apiService.getData<Post[]>('posts'),
    users: this.apiService.getData<User[]>('users')
  }).subscribe({
    next: ({ posts, users }) => {
      this.postsData.set(posts);
      this.usersData.set(users);
     let updatedData= this.postsData().map(post => {
        const user = users.find(u => u.id === post.userId);
        return {
          id: post.id,
          title: post.title,
          username: user?.name || 'Unknown'
        };
      });
      this.postsArrayWithUserName.set(updatedData)
    }
  });
  },
  error:error=>console.log(error)
})
}

ngOnInit(): void {
  this.loadData();
}


}
