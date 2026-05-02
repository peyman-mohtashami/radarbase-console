import {Injectable} from '@angular/core'

// import {AppProtocol, AppProtocolType, ShowIntroductionType} from '../../../core/app-lifecycle/protocol/models/protocol'
// import {AppQuestion, QuestionType} from '../../../core/app-lifecycle/questionnaire/models/question'
// import {AppTask} from '../../../core/app-lifecycle/schedule/models/task'
// import {QuestionnaireService} from "../../../core/app-lifecycle/questionnaire/questionnaire.service";
// import {
//   AnswerValueExport,
//   AnswerWithTimeLog,
//   ApplicationTimeZoneValueExport,
//   SchemaType
// } from "../../../core/data-ingestion/kafka/models/kafka";
// import {KafkaService} from "../../../core/data-ingestion/kafka/kafka.service";
// import {ScheduleService} from "../../../core/app-lifecycle/schedule/schedule.service";
import {evaluateConditionalLogic} from "./parsers";
import {AppQuestion, QuestionType} from '../models/question';
import {AnswerWithTimeLog} from '../models/kafka';
// import {RemoteConfigService} from "../../../core/configuration/remote-config/remote-config.service";
// import {ConfigKeys} from "../../../core/configuration/remote-config/enums/config";

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  // private questionnaireService = inject(QuestionnaireService);
  // private remoteConfigService = inject(RemoteConfigService);
  // private kafkaService = inject(KafkaService);
  // private scheduleService = inject(ScheduleService);

  async groupQuestionsByMatrixGroup(questions: AppQuestion[]): Promise<Record<string, AppQuestion[]>> {
    const autoNextQuestionnaireTypes = await this.getAutoNextQuestionnaireTypes();
    const groupedQuestions: Record<string, AppQuestion[]> = {};
    const fieldNames = new Set<string>();

    for (const [i, question] of questions.entries()) {
      const {
        field_name,
        field_type,
        text_validation_type_or_show_slider_number,
        matrix_group_name,
        section_header,
      } = question;

      if (fieldNames.has(field_name)) {
        throw new Error(`Duplicate field_name found: ${field_name}`);
      }
      fieldNames.add(field_name);

      if (field_type === QuestionType.TEXT) {
        question.field_type = this.getModifiedFieldType(text_validation_type_or_show_slider_number);
      }

      const key = matrix_group_name ? matrix_group_name : field_name;

      if (!groupedQuestions[key]) {
        groupedQuestions[key] = [];
      }

      groupedQuestions[key].push({
        ...question,
        section_header: i > 0 && !section_header && matrix_group_name == questions[i - 1].matrix_group_name ? questions[i - 1].section_header : section_header,
        isAutoNext: autoNextQuestionnaireTypes.has(field_type),
      });
    }


    // Convert Healthkit questionnaire to Health questionnaire
    for (const key in groupedQuestions) {
      const isHealthkitGroup = groupedQuestions[key].some(question => question.field_type === 'healthkit');
      if (isHealthkitGroup) {
        const firstQuestion = groupedQuestions[key][0];
        const healthQuestion: AppQuestion = {
          field_name: firstQuestion.field_name,
          field_type: 'health',
          field_label: firstQuestion.section_header,
          field_note: firstQuestion.field_note,
          select_choices_or_calculations: groupedQuestions[key].map(q => ({
            code: q.field_name,
            label: q.field_label || ""
          })),
        }
        groupedQuestions[key] = [healthQuestion];
      }
    }

    return groupedQuestions;
  }

  // async updateProtocolShowIntroduction(protocol: AppProtocol): Promise<void> {
  //   if (protocol.showIntroduction !== ShowIntroductionType.ALWAYS) {
  //     protocol.showIntroduction = false;
  //     await this.questionnaireService.updateProtocol(protocol);
  //   }
  // }

  private getModifiedFieldType(textFieldType?: string) {
    if (textFieldType?.includes('date')) {
      return QuestionType.DATE;
    }
    if (textFieldType?.includes('time')) {
      return QuestionType.TIME;
    }
    if (textFieldType?.includes('duration')) {
      return QuestionType.DURATION;
    }
    return QuestionType.TEXT;
  }

  // async sendToKafkaAndUpdateTaskToComplete(answers: AnswerWithTimeLog[], task: AppTask, protocol: AppProtocol) {
  //   const valueExport: AnswerValueExport = {
  //     answers,
  //     name: task.name,
  //     time: answers[0].startTime / 1000,
  //     timeCompleted: answers[answers.length - 1].endTime / 1000,
  //     timeNotification: (task.timestamp ?? 0) / 1000,
  //     version: 'version',
  //   }
  //
  //   const applicationTimezoneValueExport: ApplicationTimeZoneValueExport = {
  //     offset: new Date().getTimezoneOffset() * 60,
  //     time: (Date.now() + Math.random()) / 1000,
  //   }
  //
  //   await Promise.all([
  //     this.updateTaskToComplete(task),
  //     !task.isDemo ? this.kafkaService.prepareKafkaObjectAndStore(SchemaType.ASSESSMENT, valueExport, protocol.questionnaire.avsc) : [],
  //     this.kafkaService.prepareKafkaObjectAndStore(SchemaType.TIMEZONE, applicationTimezoneValueExport)
  //   ]);
  //   await this.kafkaService.sendCachedData();
  // }

  // async updateTaskToComplete(task: AppTask): Promise<void> {
  //   await Promise.all([
  //     this.scheduleService.updateTaskToComplete(task).then(
  //       () => this.scheduleService.updateTaskToReportedCompletion(task)),
  //     task.type == AppProtocolType.SCHEDULED ? this.scheduleService.addToCompletedTasks(task) : Promise.resolve()
  //   ])
  // }
  //
  // async getProtocolOfTask(task: AppTask): Promise<AppProtocol> {
  //   return this.questionnaireService.getProtocolOfTask(task);
  // }

  shouldShowQuestion(questions: AppQuestion[], answers: Record<string, AnswerWithTimeLog[]>): boolean {
    let shouldBeShown = true;
    for (const question of questions) {
      if (!question.branching_logic) {
        shouldBeShown = true;
        return shouldBeShown;
      } else {
        const branchingLogic = question.branching_logic;
        if(this.branchingLogicPass(branchingLogic, answers)) {
          shouldBeShown = true;
          return shouldBeShown;
        } else {
          shouldBeShown = false;
        }
      }
    }
    return shouldBeShown;
  }

  branchingLogicPass(branchingLogic: string, answers: Record<string, AnswerWithTimeLog[]>): boolean {
    const answersArray:  AnswerWithTimeLog[] = Object.values(answers).flat();
    const _answers = answersArray.reduce((acc: Record<string, AnswerWithTimeLog>, answer) => {
      acc[answer.id] = answer;
      return acc;
    }, {});
    return evaluateConditionalLogic(_answers, branchingLogic);
  }


  // REMOTE CONFIG METHODS
  async getIsProgressCountShown(): Promise<boolean> {
    // const showTaskProgressCount = await this.remoteConfigService.get(ConfigKeys.SHOW_TASK_PROGRESS_COUNT);
    // return JSON.parse(showTaskProgressCount);
    return false;
  }

  private async getAutoNextQuestionnaireTypes(): Promise<Set<string>> {
    // const autoNextString = await this.remoteConfigService.get(ConfigKeys.AUTO_NEXT_QUESTIONNAIRE_TYPES);
    // const autoNext = autoNextString.split(',');
    // if (autoNext.length) {
    //   return new Set(autoNext);
    // } else {
    //   return new Set();
    // }
    return new Set();
  }

  // async getSkippableQuestionnaireTypes(): Promise<Set<string>> {
  //   const skippableString = await this.remoteConfigService.get(ConfigKeys.SKIPPABLE_QUESTIONNAIRE_TYPES);
  //   const skippable = skippableString.split(',');
  //   if (skippable.length) {
  //     return new Set(skippable);
  //   } else {
  //     return new Set();
  //   }
  // }
}
