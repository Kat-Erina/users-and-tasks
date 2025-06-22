import { Component,  inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { User } from '../../core/models/models';
import { Router } from '@angular/router';
import { LoaderComponent } from "../../core/shared/loader/loader.component";

@Component({
  selector: 'app-users',
  imports: [LoaderComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent implements OnInit {

apiService=inject(ApiService);
router=inject(Router)
usersData=signal<User[]>([]);
originalUsers=signal<User[]>([]);
errorMsg=signal<string|null>(null)
isLoading=signal(true)


loadUsersData(){
 this.apiService.getData<User[]>('users').subscribe({
    next:(respone)=>{this.usersData.set(respone);
      this.originalUsers.set(respone)
      this.isLoading.set(false)
    }, 
    error: ()=>{this.errorMsg.set('Could not fetch Users')
      this.isLoading.set(false)
    }
  })

}

ngOnInit(): void {
  this.loadUsersData()
}


navigateToUsersData(userId:number, route:string){
  localStorage.setItem('userId', JSON.stringify(userId) )
  this.router.navigate([route])
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
