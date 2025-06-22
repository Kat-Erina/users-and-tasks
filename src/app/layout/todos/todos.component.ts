import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { ToDo } from '../../core/models/models';
import { CardComponent } from '../../core/shared/card/card.component';

@Component({
  selector: 'app-todos',
  imports: [CardComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

apiService=inject(ApiService);
toDos=signal<ToDo[]>([])
userTodossArray=signal<ToDo[]>([]);
destroyRef=inject(DestroyRef);
errorMes=signal<string|null>(null)

loadUserTodos(){
 let subs=this.apiService.getData<ToDo[]>('todos').subscribe({
    next:response=>{
    this.toDos.set(response);
     let fetchedData=localStorage.getItem('userId');
  if(fetchedData){
const updatedData=this.toDos().filter(todo=>{return todo.userId===Number(fetchedData)});
this.userTodossArray.set(updatedData);
  }
    },
    error:()=>this.errorMes.set("Could not fetch User's todo list")
  })

  this.destroyRef.onDestroy(()=>{
    subs.unsubscribe()
  })
}

ngOnInit(): void {
this.loadUserTodos()
  }
 


}
