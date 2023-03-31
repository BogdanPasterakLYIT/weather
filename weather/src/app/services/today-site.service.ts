import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TodaySite } from '../models/today-site';
import { TodaySiteAvrage } from '../models/today-site-avrage';

@Injectable({
  providedIn: 'root',
})
export class TodaySiteService {
  url = 'http://localhost:3000/today';
  urlAvrage = 'http://localhost:3000/avrage';

  constructor(private httpClient: HttpClient) {}

  getTodaySite(site: string, day: Date) {
    let dateString = day.toJSON().substring(0, 10);
    return this.httpClient.get<TodaySite[]>(
      `${this.url}/${site}/${dateString}`
    );
  }

  getTodaySiteAvrage(site: string, day: Date) {
    let dateString = day.toJSON().substring(0, 10);

    return this.httpClient.get<TodaySiteAvrage>(
      `${this.urlAvrage}/${site}/${dateString}`
    );
  }
}
