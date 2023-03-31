import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodaySiteService } from '../services/today-site.service';
import { TodaySiteAvrage } from '../models/today-site-avrage';
import { TodaySite } from '../models/today-site';

@Component({
  selector: 'app-today-site',
  templateUrl: './today-site.component.html',
  styleUrls: ['./today-site.component.css'],
})
export class TodaySiteComponent {
  site = '';
  day: Date = new Date();
  siteData: TodaySite[] = [];
  avrage: TodaySiteAvrage = new TodaySiteAvrage(0, 0, 0);

  constructor(
    private route: ActivatedRoute,
    private service: TodaySiteService
  ) {
    this.site = route.snapshot.paramMap.get('site') || '';
    this.day = new Date(route.snapshot.paramMap.get('day') || '');
    // console.log('constructor', this.site, this.day);
    service.getTodaySite(this.site, this.day).subscribe((res) => {
      this.siteData = res;
    });

    service.getTodaySiteAvrage(this.site, this.day).subscribe((res) => {
      this.avrage = res;
    });
  }
}
