import { Component } from '@angular/core';
import { Properties } from '../models/live';
import { LiveService } from '../services/live.service';

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css'],
})
export class LiveComponent {
  properties: Properties[] = [];
  name: string = '';

  constructor(private service: LiveService) {
    service.getSites().subscribe((obj) => {
      // array of properties from features
      this.properties = obj.features.map((f) => f.properties);
    });
  }

  getArrow(dir: number) {
    if (dir === null) return 'bi bi-dash';
    if (dir < 23 || dir > 337) return 'bi bi-arrow-up';
    if (dir < 68) return 'bi bi-arrow-up-right';
    if (dir < 113) return 'bi bi-arrow-right';
    if (dir < 158) return 'bi bi-arrow-down-right';
    if (dir < 203) return 'bi bi-arrow-down';
    if (dir < 248) return 'bi bi-arrow-down-left';
    if (dir < 293) return 'bi bi-arrow-left';
    if (dir < 338) return 'bi bi-arrow-up-left';
    return 'bi bi-bug';
  }

  onChange() {
    this.service.getSites().subscribe((obj) => {
      // filter by name
      this.properties = obj.features
        .map((f) => f.properties)
        .filter((f) => f.site_name.includes(this.name));
    });
  }
}
