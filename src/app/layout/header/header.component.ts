import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
date=signal('')
hour=signal('')
minutes=signal('')

private intervalId!: ReturnType<typeof setInterval>;


ngOnInit(): void {

const now = new Date();
this.updateTime()
 this.date.set(now.toLocaleDateString())
  this.intervalId = setInterval(() => {
      this.updateTime();
    }, 60_000); 
  }


   updateTime(): void {
    const now = new Date();
this.hour.set(now.getHours().toString().padStart(2, '0'))
this.minutes.set(now.getMinutes().toString().padStart(2, '0'))
  }

   ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
  
}






