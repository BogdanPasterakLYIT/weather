import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SitesService {
  constructor() {}

  getSites() {
    return ['Bo', 'Pa'];
  }
}
