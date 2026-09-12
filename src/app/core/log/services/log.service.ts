import {inject, Injectable} from '@angular/core';
import { NGXLogger } from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class LogService {
  private readonly logger = inject(NGXLogger);

  logError(error: Error){
    this.logger.error(error);
  }

  logWarn(error: Error){
    this.logger.warn(error);
  }

  logInfo(error: Error){
    this.logger.info(error);
  }
}
