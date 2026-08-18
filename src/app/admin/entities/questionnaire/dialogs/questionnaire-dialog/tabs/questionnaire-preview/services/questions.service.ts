// import {Injectable} from '@angular/core'
//
// // import {AppProtocol, AppProtocolType, ShowIntroductionType} from '../../../core/app-lifecycle/protocol/models/protocol'
// // import {AppQuestion, QuestionType} from '../../../core/app-lifecycle/questionnaire/models/question'
// // import {AppTask} from '../../../core/app-lifecycle/schedule/models/task'
// // import {QuestionnaireService} from "../../../core/app-lifecycle/questionnaire/questionnaire.service";
// // import {
// //   AnswerValueExport,
// //   AnswerWithTimeLog,
// //   ApplicationTimeZoneValueExport,
// //   SchemaType
// // } from "../../../core/data-ingestion/kafka/models/kafka";
// // import {KafkaService} from "../../../core/data-ingestion/kafka/kafka.service";
// // import {ScheduleService} from "../../../core/app-lifecycle/schedule/schedule.service";
// import {evaluateConditionalLogic} from "./parsers";
// import {QuestionType} from '../models/question';
// import {AnswerWithTimeLog} from '../models/kafka';
// import {AppQuestion} from '../../../../../models/questionnaire';
//
// // import {RemoteConfigService} from "../../../core/configuration/remote-config/remote-config.service";
// // import {ConfigKeys} from "../../../core/configuration/remote-config/enums/config";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class QuestionsService {
//   // private questionnaireService = inject(QuestionnaireService);
//   // private remoteConfigService = inject(RemoteConfigService);
//   // private kafkaService = inject(KafkaService);
//   // private scheduleService = inject(ScheduleService);
//
//
//
//   // async updateProtocolShowIntroduction(protocol: AppProtocol): Promise<void> {
//   //   if (protocol.showIntroduction !== ShowIntroductionType.ALWAYS) {
//   //     protocol.showIntroduction = false;
//   //     await this.questionnaireService.updateProtocol(protocol);
//   //   }
//   // }
//
//
//
//   // async sendToKafkaAndUpdateTaskToComplete(answers: AnswerWithTimeLog[], task: AppTask, protocol: AppProtocol) {
//   //   const valueExport: AnswerValueExport = {
//   //     answers,
//   //     name: task.name,
//   //     time: answers[0].startTime / 1000,
//   //     timeCompleted: answers[answers.length - 1].endTime / 1000,
//   //     timeNotification: (task.timestamp ?? 0) / 1000,
//   //     version: 'version',
//   //   }
//   //
//   //   const applicationTimezoneValueExport: ApplicationTimeZoneValueExport = {
//   //     offset: new Date().getTimezoneOffset() * 60,
//   //     time: (Date.now() + Math.random()) / 1000,
//   //   }
//   //
//   //   await Promise.all([
//   //     this.updateTaskToComplete(task),
//   //     !task.isDemo ? this.kafkaService.prepareKafkaObjectAndStore(SchemaType.ASSESSMENT, valueExport, protocol.questionnaire.avsc) : [],
//   //     this.kafkaService.prepareKafkaObjectAndStore(SchemaType.TIMEZONE, applicationTimezoneValueExport)
//   //   ]);
//   //   await this.kafkaService.sendCachedData();
//   // }
//
//   // async updateTaskToComplete(task: AppTask): Promise<void> {
//   //   await Promise.all([
//   //     this.scheduleService.updateTaskToComplete(task).then(
//   //       () => this.scheduleService.updateTaskToReportedCompletion(task)),
//   //     task.type == AppProtocolType.SCHEDULED ? this.scheduleService.addToCompletedTasks(task) : Promise.resolve()
//   //   ])
//   // }
//   //
//   // async getProtocolOfTask(task: AppTask): Promise<AppProtocol> {
//   //   return this.questionnaireService.getProtocolOfTask(task);
//   // }
//
//   // shouldShowQuestion(questions: AppQuestion[], answers: Record<string, AnswerWithTimeLog[]>): boolean {
//   //   let shouldBeShown = true;
//   //   for (const question of questions) {
//   //     if (!question.branching_logic) {
//   //       shouldBeShown = true;
//   //       return shouldBeShown;
//   //     } else {
//   //       const branchingLogic = question.branching_logic;
//   //       if(this.branchingLogicPass(branchingLogic, answers)) {
//   //         shouldBeShown = true;
//   //         return shouldBeShown;
//   //       } else {
//   //         shouldBeShown = false;
//   //       }
//   //     }
//   //   }
//   //   return shouldBeShown;
//   // }
//   //
//   // shouldShowQuestion2(question: AppQuestion, answers: Record<string, AnswerWithTimeLog[]>) {
//   //   console.log('C---lass: QuestionsService, Function: shouldShowQuestion2, Line 166 ' , question, answers, question.branching_logic);
//   //   if (!question.branching_logic) {
//   //     console.log('Class: QuestionsService, Function: shouldShowQuestion2, Line 168 ' , );
//   //     return true;
//   //   } else {
//   //     console.log('C---lass: QuestionsService, Function: shouldShowQuestion2, Line 171 ' , );
//   //     return this.branchingLogicPass(question.branching_logic, answers);
//   //   }
//   // }
//
//   // branchingLogicPass(branchingLogic: string, answers: Record<string, AnswerWithTimeLog[]>): boolean {
//   //   const answersArray:  AnswerWithTimeLog[] = Object.values(answers).flat();
//   //   const _answers = answersArray.reduce((acc: Record<string, AnswerWithTimeLog>, answer) => {
//   //     acc[answer.id] = answer;
//   //     return acc;
//   //   }, {});
//   //   console.log('C---lass: QuestionsService, Function: branchingLogicPass, Line 182 ' , _answers);
//   //   return evaluateConditionalLogic(_answers, branchingLogic);
//   // }
//
//
//   // REMOTE CONFIG METHODS
//   async getIsProgressCountShown(): Promise<boolean> {
//     // const showTaskProgressCount = await this.remoteConfigService.get(ConfigKeys.SHOW_TASK_PROGRESS_COUNT);
//     // return JSON.parse(showTaskProgressCount);
//     return false;
//   }
//
//   // private async getAutoNextQuestionnaireTypes(): Promise<Set<string>> {
//   //   // const autoNextString = await this.remoteConfigService.get(ConfigKeys.AUTO_NEXT_QUESTIONNAIRE_TYPES);
//   //   // const autoNext = autoNextString.split(',');
//   //   // if (autoNext.length) {
//   //   //   return new Set(autoNext);
//   //   // } else {
//   //   //   return new Set();
//   //   // }
//   //   return new Set();
//   // }
//
//   // async getSkippableQuestionnaireTypes(): Promise<Set<string>> {
//   //   const skippableString = await this.remoteConfigService.get(ConfigKeys.SKIPPABLE_QUESTIONNAIRE_TYPES);
//   //   const skippable = skippableString.split(',');
//   //   if (skippable.length) {
//   //     return new Set(skippable);
//   //   } else {
//   //     return new Set();
//   //   }
//   // }
//
// }
