export type MapApiResponse = {
  version: string;
  generatedAt: number;
  host: string;
  radar: RadarData;
};

export type RadarData = {
  past: RadarFrame[];
};

export type RadarFrame = {
  time: number;
  path: string;
};

export type ApiResponse<T> = {
  status: number;
  data?: T;
};