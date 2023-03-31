export interface ITodaySiteAvrage {
  air_temperature: number;
  road_surface_temperature: number;
  wind_speed: number;
}

export class TodaySiteAvrage implements ITodaySiteAvrage {
  public air_temperature: number;
  public road_surface_temperature: number;
  public wind_speed: number;

  constructor(
    air_temperature: number,
    road_surface_temperature: number,
    wind_speed: number
  ) {
    this.air_temperature = air_temperature;
    this.road_surface_temperature = road_surface_temperature;
    this.wind_speed = wind_speed;
  }
}
