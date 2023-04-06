import { Component } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { National, SiteStat } from '../models/stats';
import { sort } from 'd3';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
})
export class StatsComponent {
  nat: National[] = [];
  ss: SiteStat[] = [];

  constructor(service: StatsService) {
    service.getNational('air_temperature').subscribe((res) => {
      this.nat.push(res[0]);
      this.sortNat();
    });
    service.getNational('road_surface_temperature').subscribe((res) => {
      this.nat.push(res[0]);
      this.sortNat();
    });
    service.getNational('wind_speed').subscribe((res) => {
      this.nat.push(res[0]);
      this.sortNat();
    });
    // Site stats
    service.getSiteStats('air_temperature', 'Coldest').subscribe((res) => {
      this.ss.push(res[0]);
      this.sortSS();
    });
    service.getSiteStats('air_temperature', 'Warmest').subscribe((res) => {
      this.ss.push(res[0]);
      this.sortSS();
    });
    service.getSiteStats('wind_speed', 'Windiest').subscribe((res) => {
      this.ss.push(res[0]);
      this.sortSS();
    });
  }

  sortNat() {
    this.nat.sort((a, b) => ((a.name || '') > (b.name || '') ? 1 : -1));
  }
  sortSS() {
    this.ss.sort((a, b) => ((a.name || '') > (b.name || '') ? 1 : -1));
  }

  transformName(name: String) {
    return name
      .replace('surface_', '')
      .replace('_', ' ')
      .split(' ')
      .map((w) => w.charAt(0).toUpperCase() + w.substring(1))
      .join(' ');
  }
}
