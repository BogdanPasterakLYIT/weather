import { Component } from '@angular/core';
import { SitesService } from '../services/sites.service';
import { TodayService } from '../services/today.service';
import { SiteDataService } from '../services/site-data.service';

@Component({
  selector: 'routes',
  templateUrl: './routes.component.html',
  styleUrls: ['./routes.component.css'],
})
export class RoutesComponent {
  constructor(
    private sitesService: SitesService,
    private todayService: TodayService,
    private siteDataService: SiteDataService
  ) {}

  getSites() {
    this.sitesService.getSites().subscribe((res) => {
      console.log(res);
      let tab = window.open('data:sites', '_blank');
      tab?.document.write(JSON.stringify(res));
      tab?.document.close();
    });
  }

  getToday() {
    this.todayService.getToday(new Date('2023-03-01')).subscribe((res) => {
      console.log(res);
      let tab = window.open('data:today', '_blank');
      tab?.document.write(JSON.stringify(res));
      tab?.document.close();
    });
  }

  getSiteData() {
    this.siteDataService.getSiteData('M1 Dublin Airport').subscribe((res) => {
      console.log(res);
      let tab = window.open('data:today', '_blank');
      tab?.document.write(JSON.stringify(res));
      tab?.document.close();
    });
  }
}
