import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Post, User } from '../../core/models/models';
import { StateService } from '../../core/services/state.service';
import { forkJoin } from 'rxjs';
import { PopupComponent } from './popup/popup.component';
import { LoaderComponent } from '../../core/shared/loader/loader.component';

@Component({
  selector: 'app-posts',
  imports: [PopupComponent, LoaderComponent],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
apiService=inject(ApiService);
stateService=inject(StateService)
postsData=signal<Post[]>([])
usersData=signal<User[]>([])
postsArrayWithUserName=signal<{ title: string; username: string, id:number }[] >([]) ;
destroyRef=inject(DestroyRef)
isLoading=signal(true)
errorMsg=signal('')

loadData(){
const subs=forkJoin({
    posts: this.apiService.getData<Post[]>('posts'),
    users: this.apiService.getData<User[]>('users')
  }).subscribe({
    next: ({ posts, users }) => {
      this.postsData.set(posts);
      this.usersData.set(users);
      this.isLoading.set(false)
     let updatedData= this.postsData().map(post => {
        const user = users.find(u => u.id === post.userId);
        return {
          id: post.id,
          title: post.title,
          username: user?.name || 'Unknown'
        };
      });
      this.postsArrayWithUserName.set(updatedData)
    }, 
    error:()=>{
      this.errorMsg.set('Could not fetch Posts')
      this.isLoading.set(false)
    }
  });

  this.destroyRef.onDestroy(()=>{
    subs.unsubscribe()
  })
}

displayFullInfo(id:number){
  this.stateService.popUpIsOpen.set(true);
  let selectedPost=this.postsData().filter((post)=>{
    return post.id===id
  })
  this.stateService.selectedPost.set(selectedPost[0]);
}

ngOnInit(): void {
  this.loadData();
}


}
