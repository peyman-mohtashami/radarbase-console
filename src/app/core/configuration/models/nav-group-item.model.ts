export interface NavGroupItem {
  permission?: { role: string; entityName?: string }[];
  header?: { icon: string; name: string };
  expanded?: boolean;
  navList: {
    name: string;
    icon: string;
    route?: string;
    external?: boolean;
    permission?: { role: string; entityName?: string }[];
    exactMatch?: boolean;
  }[];
  close?: boolean;
}
