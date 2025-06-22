import { Component,  DestroyRef,  inject,  OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
day=signal(0)
month=signal(0)
year=signal(0)
hour=signal('')
minutes=signal('')
destroyRef=inject(DestroyRef)


ngOnInit(): void {

this.updateTime();
 
    interval(60000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateTime());
  }

   updateTime(): void {
const now = new Date();
this.day.set(now.getDate())
this.month.set(now.getMonth())
this.year.set(now.getFullYear())
this.hour.set(now.getHours().toString().padStart(2, '0'))
this.minutes.set(now.getMinutes().toString().padStart(2, '0'))
  }
  }










