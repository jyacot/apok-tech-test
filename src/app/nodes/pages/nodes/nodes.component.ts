import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Node } from 'src/app/shared/interfaces/node.type';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { NodesService } from '../../services/nodes.service';
import { catchError, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nodes',
  templateUrl: './nodes.component.html',
  styleUrls: ['./nodes.component.scss'],
})
export class NodesComponent implements OnInit {
  parentNodes$: Observable<Node[]>;
  constructor(
    private localeService: LocaleService,
    private nodeService: NodesService
  ) {
    this.parentNodes$ = this.localeService.localeSelected$.pipe(
      switchMap((locale) => {
        return locale
          ? this.nodeService.getAllParentNodes({ locale }).pipe()
          : of([]);
      })
    );
  }

  ngOnInit(): void {}
}
