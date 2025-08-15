import {ErrorDisplayType} from "../enums/error.enum";

export interface AppError {
  message: string[];
  displayType?: ErrorDisplayType;
  code?: string;
}
