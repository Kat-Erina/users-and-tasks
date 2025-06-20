import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Post } from '../../core/models/models';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit{
http=inject(ApiService);
postsData=signal<Post[]>([])

loadData(){
this.http.getData<Post[]>('posts').subscribe({
  next:response=>{console.log(response)},
  error:error=>console.log(error)
})
}

ngOnInit(): void {
  this.loadData()
}

}
