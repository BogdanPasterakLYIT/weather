import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Live } from '../models/live';

@Injectable({
  providedIn: 'root',
})
export class LiveService {
  url = 'https://tiitrafficdata.azurewebsites.net/api/Weather';
  constructor(private httpClient: HttpClient) {}

  getSites() {
    return this.httpClient.get<Live>(this.url);
  }
}
