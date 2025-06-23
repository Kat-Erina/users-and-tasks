import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterModule } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  currentDate = signal(new Date());

  ngOnInit(): void {
    this.updateTime();
    interval(60 - new Date().getSeconds() * 1000)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.updateTime());
  }

  updateTime(): void {
    this.currentDate.set(new Date());
  }
}
