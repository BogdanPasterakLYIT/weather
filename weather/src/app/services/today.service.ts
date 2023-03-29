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
}
