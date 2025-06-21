import { Component, inject, OnInit, signal } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { Post } from '../../core/models/models';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../core/services/api.service';
import { PostCardComponent } from './post-card/post-card.component';

@Component({
  selector: 'app-user-posts',
  imports: [PostCardComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent implements OnInit{
stateService=inject(StateService);
apiService=inject(ApiService);
posts=signal<Post[]>([])
userPostsArray=this.stateService.userPostsArray;

loadUserPosts(){
  this.apiService.getData<Post[]>('posts').subscribe({
    next:response=>{
    this.posts.set(response);
     let fetchedData=localStorage.getItem('userId');
  if(fetchedData){
    console.log(fetchedData)
const updatedData=this.posts().filter(post=>{return post.userId===Number(fetchedData)});
this.userPostsArray.set(updatedData);
console.log(this.userPostsArray())

  }
    
    }
  })
}



ngOnInit(): void {
this.loadUserPosts()
  }
 

}
