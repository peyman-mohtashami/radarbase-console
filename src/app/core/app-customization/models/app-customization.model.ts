import {ThemeConfig} from "../../theme/models/theme.model";
import {Language} from '../../../shared/models/locale.model';

export interface AppCustomization {
  branding: {
    name: string;
    logo: string;
    title: string;
    description: string;
  };
  theme: ThemeConfig;
  locale: {
    languages: Language[];
    translationsBaseUrl?: string;
  };
  entities?: any;
}
