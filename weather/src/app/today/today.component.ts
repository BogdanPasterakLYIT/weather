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

  constructor(service: TodayService) {
    service.getToday(this.day).subscribe((obj) => {
      this.sites = obj;
    });
  }

  next(offset: number) {
    var next = new Date(this.day);
    next.setDate(next.getDate() + offset);
    this.day = next;
  }

  sort(what: string, where: string) {
    console.log(what, where);
  }
}
