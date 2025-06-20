import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/models';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {
displayedColumns: string[] = ['name','lastname', 'tel', 'email', 'company','action'];

apiService=inject(ApiService);
usersData=signal<User[]>([])

loadUsersData(){
  this.apiService.getData<User[]>('users').subscribe({
    next:(respone)=>{
      console.log(respone)
      this.usersData.set(respone)
    }, 
    error: (error)=>console.log(error)
  
  })
}


ngOnInit(): void {
  this.loadUsersData()
}

}
