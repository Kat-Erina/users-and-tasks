import { Component,  inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ToDo } from '../../core/models/models';
import { CardComponent } from '../../core/shared/card/card.component';
import { LoaderComponent } from '../../core/shared/loader/loader.component';

@Component({
  selector: 'app-todos',
  imports: [CardComponent, LoaderComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

apiService=inject(ApiService);
toDos=signal<ToDo[]>([])
userTodossArray=signal<ToDo[]>([]);
errorMes=signal<string|null>(null)
isLoading=signal(true)

loadUserTodos(){
 this.apiService.getData<ToDo[]>('todos').subscribe({
    next:response=>{
    this.toDos.set(response);
    this.isLoading.set(false)
     let fetchedData=localStorage.getItem('userId');
  if(fetchedData){
const updatedData=this.toDos().filter(todo=>{return todo.userId===Number(fetchedData)});
this.userTodossArray.set(updatedData);
  }
    },
    error:()=>{this.errorMes.set("Could not fetch User's todo list")
       this.isLoading.set(false)
    }
  })

  
}

ngOnInit(): void {
this.loadUserTodos()
  }
 


}
