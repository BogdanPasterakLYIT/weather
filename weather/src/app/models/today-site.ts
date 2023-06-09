export interface ITodaySite {
  timenow: string;
  air_temperature: number;
  road_surface_temperature: number;
  wind_speed: number;
}

export class TodaySite implements ITodaySite {
  public timenow: string;
  public air_temperature: number;
  public road_surface_temperature: number;
  public wind_speed: number;

  constructor(
    timenow: string,
    air_temperature: number,
    road_surface_temperature: number,
    wind_speed: number
  ) {
    this.timenow = timenow;
    this.air_temperature = air_temperature;
    this.road_surface_temperature = road_surface_temperature;
    this.wind_speed = wind_speed;
  }
}
