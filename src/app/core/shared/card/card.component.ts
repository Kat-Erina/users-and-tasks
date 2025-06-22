import { Component, Input } from '@angular/core';
import { CardData } from '../../models/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
@Input() data!:CardData

}
