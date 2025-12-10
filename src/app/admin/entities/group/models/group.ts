export interface RadarGroup {
  id: number | string;
  name: string;
  projectId: number;
  projectName: string;
}

export interface AppGroup extends RadarGroup {
 _name: string;
 _search: string;
}
