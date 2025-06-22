import { Component, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
currentYear=signal(0)

ngOnInit(): void {
  const now=new Date()
  this.currentYear.set(now.getFullYear())
}

}
