import { Component,  inject, OnInit, signal } from '@angular/core';
import { Post } from '../../core/models/models';
import { ApiService } from '../../core/services/api.service';
import { CardComponent } from '../../core/shared/card/card.component';
import { LoaderComponent } from '../../core/shared/loader/loader.component';

@Component({
  selector: 'app-user-posts',
  imports: [CardComponent, LoaderComponent],
  templateUrl: './user-posts.component.html',
  styleUrl: './user-posts.component.scss'
})
export class UserPostsComponent implements OnInit{

apiService=inject(ApiService);
posts=signal<Post[]>([])
userPostsArray=signal<Post[]>([]);
errorMes=signal<string|null>(null)
isLoading=signal(true)

loadUserPosts(){
this.apiService.getData<Post[]>('posts').subscribe({
    next:response=>{
    this.posts.set(response);
    this.isLoading.set(false)
    let fetchedData=localStorage.getItem('userId');
  if(fetchedData){
const updatedData=this.posts().filter(post=>{return post.userId===Number(fetchedData)});
this.userPostsArray.set(updatedData);
  }
    },
    error:()=>{this.errorMes.set("Could not fetch User's Posts")
          this.isLoading.set(false)

    }
  })


}


ngOnInit(): void {
this.loadUserPosts()
  }
 

}
