import { Component } from '@angular/core';
import { SitesService } from '../services/sites.service';
import { SiteDataService } from '../services/site-data.service';
import { SiteData } from '../models/site-data';

@Component({
  selector: 'app-site-data',
  templateUrl: './site-data.component.html',
  styleUrls: ['./site-data.component.css'],
})
export class SiteDataComponent {
  name: string = '';
  radio = 'air_temperature';
  max = 1;
  min = 0;
  range = 0;
  options: string[] = [];
  data: SiteData[] = [];
  sites: SiteData[] = [];

  constructor(service: SitesService, private serviceSD: SiteDataService) {
    // options for select (names of site)
    service.getSites().subscribe((obj) => {
      obj.map((s) => this.options.push(s.site_name));
    });
  }

  onChange() {
    this.serviceSD.getSiteData(this.name).subscribe((res) => {
      this.data = res;
      this.setMinMax();
      this.sites = res;
    });
  }

  radioChange() {
    this.setMinMax();
    this.sites = this.data;
  }

  rangeChange() {
    console.log('range', this.range);
    if (this.radio === 'air_temperature') {
      this.sites = this.data.filter((s) => s.air_temperature <= this.range);
    } else {
      this.sites = this.data.filter((s) => s.wind_speed <= this.range);
    }
  }

  sort(col: number, dir: string) {
    switch (col) {
      case 0:
        if (dir === 'ASC')
          this.sites.sort((a, b) => a.air_temperature - b.air_temperature);
        else this.sites.sort((a, b) => b.air_temperature - a.air_temperature);
        break;
      case 1:
        if (dir === 'ASC')
          this.sites.sort(
            (a, b) => a.road_surface_temperature - b.road_surface_temperature
          );
        else
          this.sites.sort(
            (a, b) => b.road_surface_temperature - a.road_surface_temperature
          );
        break;
      case 2:
        if (dir === 'ASC')
          this.sites.sort((a, b) => a.wind_speed - b.wind_speed);
        else this.sites.sort((a, b) => b.wind_speed - a.wind_speed);
        break;
    }
  }

  setMinMax() {
    this.max = -100;
    this.min = 500;
    this.data.map((r) => {
      if (this.radio === 'air_temperature') {
        if (r.air_temperature > this.max) this.max = r.air_temperature;
        if (r.air_temperature < this.min) this.min = r.air_temperature;
      } else {
        if (r.wind_speed > this.max) this.max = r.wind_speed;
        if (r.wind_speed < this.min) this.min = r.wind_speed;
      }
      this.range = this.max;
    });
  }
}
