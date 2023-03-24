import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  url = 'http://localhost:3000/sites';
  constructor(private httpClient: HttpClient) {}

  getSites() {
    return this.httpClient.get(this.url);
  }
}
