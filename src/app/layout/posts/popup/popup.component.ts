import { Component, inject, Input } from '@angular/core';
import { StateService } from '../../../core/services/state.service';
import { Post } from '../../../core/models/models';

@Component({
  selector: 'app-popup',
  imports: [],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
stateService=inject(StateService)
@Input() postData!:Post | null

  close() {
    this.stateService.popUpIsOpen.set(false)
}

ngOnInit(){
  console.log(this.stateService.selectedPost())
  console.log(this.postData)
}
}
