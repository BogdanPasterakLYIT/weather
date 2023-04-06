interface Geometry {
  type: string;
  coordinates: number[];
}

export interface Properties {
  site_name: string;
  camera_image: string;
  air_temperature: number;
  precipitation_type: string;
  precipitation_intensity: number;
  wind_speed: number;
  road_surface_temperature: number;
  visibility_value: number;
  wind_direction_bearing: number;
  weather_description: string;
  weather_definition: string;
  order: number;
  lat?: number;
  lng?: number;
}

export interface PropLL extends Properties {}

export interface Features {
  type: string;
  id: string;
  geometry: Geometry;
  properties: Properties;
}

export interface Live {
  type: string;
  features: Features[];
}
