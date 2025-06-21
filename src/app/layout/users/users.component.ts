import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/models';
import { StateService } from '../../core/services/state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

apiService=inject(ApiService);
stateService=inject(StateService)
router=inject(Router)
usersData=this.stateService.usersData;
originalUsers=signal<User[]>([])


loadUsersData(){
  this.apiService.getData<User[]>('users').subscribe({
    next:(respone)=>{this.usersData.set(respone);
      this.originalUsers.set(respone)
    }, 
    error: (error)=>console.log(error)
  })
}




ngOnInit(): void {
  this.loadUsersData()
}

goToUserPosts(userId:number){
  localStorage.setItem('userId', JSON.stringify(userId) )
  this.router.navigate(['/user-posts'])
}


goToUserTodos(userId:number){
  localStorage.setItem('userId', JSON.stringify(userId) )
  this.router.navigate(['/user-todos'])
}


applyFilteres(event:Event){
 const inputValue=(event.target as HTMLInputElement).value.toLowerCase().trim();
 const filtered = this.originalUsers().filter(user =>
    user.name.toLowerCase().includes(inputValue) ||
    user.email.toLowerCase().includes(inputValue)
  );
  this.usersData.set(filtered);
}

}
