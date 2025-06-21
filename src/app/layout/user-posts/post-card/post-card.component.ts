import { Component, inject, Input } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { Post } from '../../../core/models/models';

@Component({
  selector: 'app-post-card',
  imports: [],
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.scss'
})
export class PostCardComponent {
@Input() postData!:Post
}
