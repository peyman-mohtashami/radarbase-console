import {Observable, of} from "rxjs";
import {RadarConfig, RadarConfigBundle} from "../../config/models/config";
import {PHQ8} from "./questionnaires/phq8/main";
import {adhd_medication_side_effects} from "./questionnaires/adhd_medication_side_effects/main";
import {adhd_medication_use} from "./questionnaires/adhd_medication_use/main";
import {audio} from "./questionnaires/audio/main";

export class MockQuestionnaireServer {
  static get(url: string): Observable<RadarConfigBundle>{
    const segments = url.split("/");
    let scope: string = 'global';
    if (segments.find(segment => segment === 'projects')) scope = segments[segments.indexOf('projects') + 1];

    if (scope === 'global') return of(globalRadarQuestionnaireBundle);
    return of(radarRadarQuestionnaireBundle);
  }

  static post(url: string, config: {config: RadarConfig[]}): Observable<RadarConfigBundle>{
    const segments = url.split("/");
    let scope: string = 'global';
    if (segments.find(segment => segment === 'projects')) scope = segments[segments.indexOf('projects') + 1];

    if (scope === 'global') return of(globalRadarQuestionnaireBundle);
    return of(radarRadarQuestionnaireBundle);
  }
}

const globalQuestionnaires: RadarConfig[] = [...PHQ8, ...adhd_medication_use, ...adhd_medication_side_effects, ...audio];
const radarQuestionnaires: RadarConfig[] = [...PHQ8];

export const globalRadarQuestionnaireBundle: RadarConfigBundle = {
  "clientId": "questionnaire-service",
  "scope": "global",
  "config": globalQuestionnaires
}

export const radarRadarQuestionnaireBundle: RadarConfigBundle = {
  "clientId": "questionnaire-service",
  "scope": "project.radar",
  "config": radarQuestionnaires,
  "defaults": globalQuestionnaires.map(q => {
    return {
      name: q.name,
      value: q.value,
      "scope": "global"
    }
  })
}

