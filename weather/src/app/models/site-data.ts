import { Time } from '@angular/common';

export interface SiteData {
  datenow: Date;
  timenow: Time;
  site_name: string;
  air_temperature: number;
  road_surface_temperature: number;
  wind_speed: number;
}
