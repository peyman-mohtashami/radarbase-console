export interface Language {
  code: string;
  locale: string;
  label: string;
  shortLabel?: string;
  dateFormat?: string;
  direction?: 'ltr' | 'rtl';
}
