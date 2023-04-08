import { Component } from '@angular/core';
import { SitesService } from '../services/sites.service';
import { SiteDataService } from '../services/site-data.service';
import { TodayService } from '../services/today.service';
import { TodaySiteService } from '../services/today-site.service';
import { TodaySite } from '../models/today-site';

@Component({
  selector: 'app-daily-stats',
  templateUrl: './daily-stats.component.html',
  styleUrls: ['./daily-stats.component.css'],
})
export class DailyStatsComponent {
  name: string = 'N15 Kilygordon';
  date: string = '2023-03-20';
  options: string[] = [];
  data: TodaySite[] = [];
  min: number | undefined;
  max: number | undefined;
  avg: number | undefined;

  constructor(service: SitesService, private serviceTS: TodaySiteService) {
    // options for select (names of site)
    service.getSites().subscribe((obj) => {
      obj.map((s) => this.options.push(s.site_name));
    });
  }

  onSubmit() {
    // console.log('Date:', this.date);
    // console.log('Site:', this.name);
    if (this.name && this.date) {
      this.serviceTS
        .getTodaySite(this.name, new Date(this.date))
        .subscribe((res) => {
          this.data = res;
          this.calk();
          // console.log(res);
        });
    }
  }
  calk() {
    this.max = Math.max(...this.data.map((e) => e.air_temperature));
    this.min = Math.min(...this.data.map((e) => e.air_temperature));
    let sum = 0;
    let count = 0;
    this.data.map((e) => {
      if (e.wind_speed) {
        count += 1;
        sum += e.wind_speed;
      }
    });
    this.avg = Math.round((sum / count) * 1000) / 1000;
  }
}
