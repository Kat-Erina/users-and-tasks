import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Post, User } from '../../core/models/models';
import { StatePService } from '../../core/services/state.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
http=inject(ApiService);
stateService=inject(StatePService)
postsData=this.stateService.postsData
usersData=this.stateService.usersData
postsArrayWithUserName=signal<{ title: string; username: string, id:number }[] >([]) ;

loadData(){
this.http.getData<Post[]>('posts').subscribe({
  next:()=>{
      forkJoin({
    posts: this.http.getData<Post[]>('posts'),
    users: this.http.getData<User[]>('users')
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
//   if(this.stateService.userId()){
// const updatedData=response.filter((post)=>{
//   return post.userId===this.stateService.userId()
// })
// this.postsData.set(updatedData)
//   }
//   else this.postsData.set(response)
  },
  error:error=>console.log(error)
})
}

ngOnInit(): void {
  this.loadData();

// console.log(this.usersData())
//   this.postsArrayWithUserName = this.postsData().map(post => {
//   const user = this.usersData().find(u => u.id === post.userId);
//   return {
//     id:post.id,
//     title: post.title,
//     userName: user?.name || 'Unknown'
//   };
// });

// console.log(this.postsArrayWithUserName)

}


}
