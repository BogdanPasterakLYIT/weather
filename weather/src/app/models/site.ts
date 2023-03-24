export interface ISite {
  site_name: string;
  geometry1: number;
  geometry2: number;
  lat: number;
  lng: number;
}

export class Site implements ISite {
  public site_name: string;
  public geometry1: number;
  public geometry2: number;
  public lat: number;
  public lng: number;

  constructor(
    site_name: string,
    geometry1: number,
    geometry2: number,
    lat: number,
    lng: number
  ) {
    this.site_name = site_name;
    this.geometry1 = geometry1;
    this.geometry2 = geometry2;
    this.lat = lat;
    this.lng = lng;
  }
}
