import { Component, OnInit } from '@angular/core';
import { LiveService } from '../services/live.service';
import { Properties } from '../models/live';
import * as L from 'leaflet';
import { SitesService } from '../services/sites.service';

@Component({
  selector: 'live-map',
  templateUrl: './live-map.component.html',
  styleUrls: ['./live-map.component.css'],
})
export class LiveMapComponent implements OnInit {
  private map: any;
  private markers: any[] = [];

  constructor(service: LiveService, siteService: SitesService) {
    service.getSites().subscribe((obj) => {
      let sites = obj.features.map((f) => f.properties);
      siteService.getSites().subscribe((res) => {
        // add lat lng to sites
        sites.map((s) => {
          let r = res.find((e) => e.site_name === s.site_name);
          s.lat = r?.lat;
          s.lng = r?.lng;
          return s;
        });
        // add markers
        sites.forEach((site) => {
          let latlng = [site.lat, site.lng];
          let icon = L.icon({
            iconUrl: `assets/image/${site.weather_description}.png`,
            iconSize: [64, 64],
            iconAnchor: [32, 32],
          });
          let marker = L.marker(latlng as L.LatLngTuple, { icon: icon }).addTo(
            this.map
          );
          let popop =
            `<b>${site.site_name}</b><br/>` +
            `<span>${site.weather_definition}</span><br/>` +
            `<span>${site.air_temperature.toFixed(1)}&#8451;</span><br/>` +
            `<span>${site.wind_speed.toFixed(1)} km/h</span><br/>`;
          if (site.camera_image) popop += `<i class="bi bi-image"></i>`;
          marker.bindPopup(popop);
          this.markers.push(marker);
        });
        console.log(new Set(sites.map((s) => s.weather_description)));
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
