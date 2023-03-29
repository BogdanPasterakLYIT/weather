export interface IToday {
  site_name: string;
  air_temperature: number;
  road_surface_temperature: number;
  wind_speed: number;
}

export class Today implements IToday {
  public site_name: string;
  public air_temperature: number;
  public road_surface_temperature: number;
  public wind_speed: number;

  constructor(
    site_name: string,
    air_temperature: number,
    road_surface_temperature: number,
    wind_speed: number
  ) {
    this.site_name = site_name;
    this.air_temperature = air_temperature;
    this.road_surface_temperature = road_surface_temperature;
    this.wind_speed = wind_speed;
  }
}
