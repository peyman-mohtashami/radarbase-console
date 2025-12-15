export type HealthStatus = 'UP' | 'DOWN' | 'UNKNOWN' | 'OUT_OF_SERVICE';

export type HealthKey = 'diskSpace' | 'mail' | 'ping' | 'livenessState' | 'readinessState' | 'db';

export interface RadarHealth {
  status: HealthStatus;
  components: {
    [key in HealthKey]: RadarHealthDetails;
  };
}

export interface RadarHealthDetails {
  status: HealthStatus;
  details?: Record<string, string>;
}
