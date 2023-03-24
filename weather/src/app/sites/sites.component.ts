import { Component } from '@angular/core';
import { SitesService } from '../services/sites.service';

@Component({
  selector: 'sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css'],
})
export class SitesComponent {
  sites: string[];

  constructor(service: SitesService) {
    this.sites = service.getSites();
  }
}
