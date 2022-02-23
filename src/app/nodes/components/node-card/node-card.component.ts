import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { DetailNode, Node } from '../../../shared/interfaces/node.type';
import { NodesService } from '../../services/nodes.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss'],
})
export class NodeCardComponent implements OnInit {
  node$: BehaviorSubject<DetailNode | null> =
    new BehaviorSubject<DetailNode | null>(null);
  @Input('id') id: number = 0;

  detailIcon = faArrowRight;

  constructor(
    private nodeService: NodesService,
    private locale: LocaleService
  ) {}

  ngOnInit(): void {
    const locale = this.locale.localeSelected$.value;
    this.nodeService.getNode({ id: this.id, locale }).subscribe({
      next: (node) => {
        this.node$.next(node);
      },
    });
  }
}
