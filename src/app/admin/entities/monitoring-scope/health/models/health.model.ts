export type HealthStatus = 'UP' | 'DOWN' | 'UNKNOWN' | 'OUT_OF_SERVICE';

export type HealthKey = 'diskSpace' | 'mail' | 'ping' | 'livenessState' | 'readinessState' | 'db';

export interface HealthDto {
  status: HealthStatus;
  components: Record<HealthKey, HealthDetailsDto>;
}

export interface HealthDetailsDto {
  status: HealthStatus;
  details?: Record<string, string>;
}
