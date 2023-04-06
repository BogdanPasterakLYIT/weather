import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SiteData } from '../models/site-data';

@Injectable({
  providedIn: 'root',
})
export class SiteDataService {
  url = 'http://localhost:3000/site-data';
  constructor(private httpClient: HttpClient) {}

  getSiteData(site: string) {
    return this.httpClient.get<SiteData[]>(`${this.url}/${site}`);
  }
}
