import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { National, SiteStat } from '../models/stats';

@Injectable({
  providedIn: 'root',
})
export class StatsService {
  url = 'http://localhost:3000/stats';
  constructor(private httpClient: HttpClient) {}

  getNational(col: string) {
    return this.httpClient.get<National[]>(`${this.url}/${col}`);
  }

  getSiteStats(col: string, name: string) {
    return this.httpClient.get<SiteStat[]>(`${this.url}/${col}/${name}`);
  }
}
