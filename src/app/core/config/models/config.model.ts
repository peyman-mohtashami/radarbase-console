import {ThemeConfig} from "../../theme/models/theme.model";
import {Language} from '../../../shared/models/locale.model';
// import {Language} from "@rb/models";

export interface ConfigState {
  title: string;
  logo: string;
  branding: {
    title: string;
    description: string;
  },
  theme: ThemeConfig;
  locale: Language[];
  entities?: any;
}
