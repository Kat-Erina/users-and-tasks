import { Component, Input } from '@angular/core';
import { ToDo } from '../../../core/models/models';

@Component({
  selector: 'app-todo-card',
  imports: [],
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss'
})
export class TodoCardComponent {
@Input() data!:ToDo;
}
