import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'sites-map',
  templateUrl: './sites-map.component.html',
  styleUrls: ['./sites-map.component.css'],
})
export class SitesMapComponent implements OnInit {
  private map: any;

  initMap(): void {
    this.map = L.map('map', {
      center: [39.8282, -98.5795],
      zoom: 3,
    });

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
