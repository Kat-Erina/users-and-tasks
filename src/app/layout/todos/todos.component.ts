import { Component, inject, OnInit, signal } from '@angular/core';
import { StateService } from '../../core/services/state.service';
import { ApiService } from '../../core/services/api.service';
import { ToDo } from '../../core/models/models';
import { TodoCardComponent } from './todo-card/todo-card.component';

@Component({
  selector: 'app-todos',
  imports: [TodoCardComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss'
})
export class TodosComponent implements OnInit {

stateService=inject(StateService);
apiService=inject(ApiService);
toDos=signal<ToDo[]>([])
userTodossArray=this.stateService.userTodossArray;

loadUserTodos(){
  this.apiService.getData<ToDo[]>('todos').subscribe({
    next:response=>{
    this.toDos.set(response);
     let fetchedData=localStorage.getItem('userId');
  if(fetchedData){
    console.log(fetchedData)
const updatedData=this.toDos().filter(todo=>{return todo.userId===Number(fetchedData)});
this.userTodossArray.set(updatedData);
console.log(this.userTodossArray())

  }
    
    }
  })
}



ngOnInit(): void {
this.loadUserTodos()
  }
 


}
