import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Post } from '../../core/models/models';
import { ApiService } from '../../core/services/api.service';
import { CardComponent } from '../../core/shared/card/card.component';

@Component({
  selector: 'app-user-posts',
  imports: [CardComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent implements OnInit{

apiService=inject(ApiService);
posts=signal<Post[]>([])
userPostsArray=signal<Post[]>([]);
destroyRef=inject(DestroyRef);
errorMes=signal<string|null>(null)


loadUserPosts(){
let sub=this.apiService.getData<Post[]>('posts').subscribe({
    next:response=>{
    this.posts.set(response);
    let fetchedData=localStorage.getItem('userId');
  if(fetchedData){
const updatedData=this.posts().filter(post=>{return post.userId===Number(fetchedData)});
this.userPostsArray.set(updatedData);
  }
    },
    error:()=>{this.errorMes.set("Could not fetch User's Posts")}
  })

  this.destroyRef.onDestroy(()=>{
    sub.unsubscribe()
  })
}


ngOnInit(): void {
this.loadUserPosts()
  }
 

}
