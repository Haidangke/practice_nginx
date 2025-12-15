import { CommonModule } from '@angular/common';
import { Component, computed, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  startDate = signal(new Date(2017, 11, 2));
  now = signal(new Date());

  space = signal(0)

  selectedUnit = signal('seconds');

  ngOnInit(): void {
    this.updateTime();

    interval(1000).subscribe(() => {
      this.updateTime();
    })
  }

  spaceInSeconds = computed(() => {
    return this.space() / 1000;
  })

  spaceInMinutes = computed(() => {
    return this.spaceInSeconds() / 60;
  })

  spaceInHours = computed(() => {
    return this.spaceInMinutes() / 60;
  })

  spaceInDays = computed(() => {
    return this.spaceInHours() / 24;
  })

  spaceInMonths = computed(() => {
    const startYear = this.startDate().getFullYear();
    const startMonth = this.startDate().getMonth();
    const startDay = this.startDate().getDate();

    const nowYear = this.now().getFullYear();
    const nowMonth = this.now().getMonth();
    const nowDay = this.now().getDate();

    let months = (nowYear - startYear) * 12 + (nowMonth - startMonth);
    if (nowDay < startDay) {
      months--;
    }
    return months;
  })

  spanceInYears = computed(() => {
    return Math.floor(this.spaceInMonths() / 12);
  })

  updateTime() {
    this.now.set(new Date());
    this.space.set(((this.now().getTime() - this.startDate().getTime())));
  }
}
