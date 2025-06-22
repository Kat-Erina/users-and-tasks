import { Component, Input } from '@angular/core';
import { CardData, ToDo } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() data!:CardData

 isTodo(): boolean {
    return 'completed' in this.data;
    // Or with discriminant: return this.data.type === 'todo';
  }
}
