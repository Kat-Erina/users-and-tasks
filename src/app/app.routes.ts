import { Routes } from '@angular/router';

export const routes: Routes = [
      { path: '', 
        loadComponent:()=>import('./layout/users/users.component').then((com)=>com.UsersComponent)
     },
       { path: 'posts', 
        loadComponent:()=>import('./layout/posts/posts.component').then((com)=>com.PostsComponent)
     },

];
