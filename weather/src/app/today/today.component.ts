import { Component } from '@angular/core';
import { TodayService } from '../services/today.service';
import { Today } from '../models/today';

@Component({
  selector: 'today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.css'],
})
export class TodayComponent {
  day = new Date('03-01-2023');
  sites: Today[] = [];

  constructor(private service: TodayService) {
    service.getToday(this.day).subscribe((res) => {
      this.sites = res;
    });
  }

  next(offset: number) {
    var next = new Date(this.day);
    next.setDate(next.getDate() + offset);
    this.service.getToday(next).subscribe((res) => {
      if (res.length > 0) {
        this.sites = res;
        this.day = next;
      }
    });
  }

  sort(what: number, where: string) {
    this.service.getTodaySort(this.day, what, where).subscribe((res) => {
      this.sites = res;
    });
  }
}
