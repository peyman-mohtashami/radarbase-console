import { Injectable } from '@angular/core';
import { NGXLogger } from "ngx-logger";

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor(private logger: NGXLogger) {
  }

  logError(error: Error){
    this.logger.error(error);
  }

  logWarn(error: Error){ //message: string[], stack: string | undefined){
    // this.logger.debug(error);
    this.logger.warn(error);
  }

  logInfo(error: Error){ //message: string[], stack: string | undefined){
    // this.logger.debug(error);
    this.logger.info(error);
  }
  // logError(message: string[], stack: string | undefined) {
  //   // TODO Send errors to server here
  //   if (message.length) {
  //     console.log('LoggingService', message, stack);
  //   }
  // }
}
