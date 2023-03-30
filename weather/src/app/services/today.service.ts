import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Today } from '../models/today';

@Injectable({
  providedIn: 'root',
})
export class TodayService {
  url = 'http://localhost:3000/today';
  constructor(private httpClient: HttpClient) {}

  getToday(day: Date) {
    let dateString = day.toJSON().substring(0, 10);
    return this.httpClient.get<Today[]>(`${this.url}/${dateString}`);
  }

  getTodaySort(day: Date, what: number, where: string) {
    const col = ['air_temperature', 'road_surface_temperature', 'wind_speed'];
    let dateString = day.toJSON().substring(0, 10);
    let column = col[what];

    return this.httpClient.get<Today[]>(
      `${this.url}/${dateString}/${column}/${where}`
    );
  }
}
