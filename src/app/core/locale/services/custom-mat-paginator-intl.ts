import {inject, Injectable, OnDestroy} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {takeUntil} from "rxjs/operators";


const PAGINATOR_TRANSLATION_KEYS = {
  itemsPerPage: 'ADMIN.SHARED.PAGINATOR.ITEMS_PER_PAGE',
  nextPage: 'ADMIN.SHARED.PAGINATOR.NEXT_PAGE',
  previousPage: 'ADMIN.SHARED.PAGINATOR.PREVIOUS_PAGE',
  of: 'ADMIN.SHARED.PAGINATOR.OF_LABEL',
} as const;

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl implements OnDestroy {
  private readonly translate = inject(TranslateService);
  private readonly destroy$ = new Subject<void>();

  private ofLabel = 'of';

  constructor() {
    super();
    this.loadTranslations();
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loadTranslations());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.ofLabel} ${length}`;
    }

    const safeLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < safeLength ? Math.min(startIndex + pageSize, safeLength) : startIndex + pageSize;

    return `${startIndex + 1} - ${endIndex} ${this.ofLabel} ${safeLength}`;
  };

  private loadTranslations(): void {
    this.translate
      .get(Object.values(PAGINATOR_TRANSLATION_KEYS))
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => {
        this.itemsPerPageLabel = translations[PAGINATOR_TRANSLATION_KEYS.itemsPerPage];
        this.nextPageLabel = translations[PAGINATOR_TRANSLATION_KEYS.nextPage];
        this.previousPageLabel = translations[PAGINATOR_TRANSLATION_KEYS.previousPage];
        this.ofLabel = translations[PAGINATOR_TRANSLATION_KEYS.of];
        this.changes.next();
      });
  }
}
