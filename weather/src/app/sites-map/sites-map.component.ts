import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { Site } from '../models/site';
import { SitesService } from '../services/sites.service';

@Component({
  selector: 'sites-map',
  templateUrl: './sites-map.component.html',
  styleUrls: ['./sites-map.component.css'],
})
export class SitesMapComponent implements OnInit {
  private map: any;
  private markers: any[] = [];
  sites: Site[] = [];

  constructor(service: SitesService) {
    service.getSites().subscribe((obj) => {
      // console.log(obj);
      this.sites = obj;
      obj.forEach((site) => {
        let latlng = [site.lat, site.lng];
        let marker = L.marker(latlng as L.LatLngTuple).addTo(this.map);
        let popop = `<b>${site.site_name}</b><br/><span>[${latlng}]</span>`;
        marker.bindPopup(popop);
        this.markers.push(marker);
      });
    });
  }

  initMap(): void {
    this.map = L.map('map', {
      center: [53.4, -7.9],
      zoom: 7,
    });

    // center of Ireland
    const tiles = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        minZoom: 3,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    ).addTo(this.map);
  }

  ngOnInit(): void {
    this.initMap();
  }
}
