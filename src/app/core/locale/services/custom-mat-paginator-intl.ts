import {Injectable, OnDestroy} from "@angular/core";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {takeUntil} from "rxjs/operators";

@Injectable()
export class CustomMatPaginatorIntl extends MatPaginatorIntl implements OnDestroy {

  OF_LABEL = 'of';
  _destroy$: Subject<void> = new Subject<void>();

  constructor(private translate: TranslateService) {
    super();
    this.initTranslations();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private initTranslations(): void {
    this.translate.onLangChange.pipe(
      takeUntil(this._destroy$)
    ).subscribe(() => {
      this.getAndInitTranslations();
    });
    this.getAndInitTranslations();
  }

  private getAndInitTranslations() {
    this.translate
      .get([
        'ADMIN.PAGINATOR.ITEMS_PER_PAGE',
        'ADMIN.PAGINATOR.NEXT_PAGE',
        'ADMIN.PAGINATOR.PREVIOUS_PAGE',
        'ADMIN.PAGINATOR.OF_LABEL',
      ]).pipe(
      takeUntil(this._destroy$)
    ).subscribe(translation => {
      this.itemsPerPageLabel =
        translation['ADMIN.PAGINATOR.ITEMS_PER_PAGE'];
      this.nextPageLabel = translation['ADMIN.PAGINATOR.NEXT_PAGE'];
      this.previousPageLabel =
        translation['ADMIN.PAGINATOR.PREVIOUS_PAGE'];
      this.OF_LABEL = translation['ADMIN.PAGINATOR.OF_LABEL'];
      this.changes.next();
    });
  }

  override getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 ${this.OF_LABEL} ${length}`;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < length
        ? Math.min(startIndex + pageSize, length)
        : startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} ${
      this.OF_LABEL
    } ${length}`;
  }
}
