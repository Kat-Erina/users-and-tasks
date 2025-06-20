import { Routes } from '@angular/router';

export const routes: Routes = [
      { path: '', 
        loadComponent:()=>import('./layout/users/users.component').then((com)=>com.UsersComponent)
     },
     { path: 'users', 
        loadComponent:()=>import('./layout/users/users.component').then((com)=>com.UsersComponent)
     },
       { path: 'posts', 
        loadComponent:()=>import('./layout/posts/posts.component').then((com)=>com.PostsComponent)
     },
     {
      path:'user-posts', 
      loadComponent:()=>import('./layout/user-posts/user-posts.component').then((com)=>com.UserPostsComponent)
     }

];
