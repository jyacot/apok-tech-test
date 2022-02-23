import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { NodesService } from '../../services/nodes.service';
import { DetailNode, Node } from '../../../shared/interfaces/node.type';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import {
  faRemoveFormat,
  faPlus,
  faArrowLeft,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-node',
  templateUrl: './node.component.html',
  styleUrls: ['./node.component.scss'],
})
export class NodeComponent implements OnInit {
  node$: BehaviorSubject<DetailNode | null> =
    new BehaviorSubject<DetailNode | null>(null);
  childs$: Observable<Node[]> = new Observable();

  plusIcon = faPlus;
  removeIcon = faTrash;
  backIcon = faArrowLeft;
  constructor(
    private activatedRoute: ActivatedRoute,
    private nodeService: NodesService,
    private localeService: LocaleService,
    private toast: ToastrService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.activatedRoute.params.subscribe(({ id }) => {
      this.childs$ = this.localeService.localeSelected$.pipe(
        tap((locale) => {
          this.nodeService.getNode({ id, locale }).subscribe((r) => {
            this.node$.next(r);
          });
        }),
        switchMap((locale) => {
          return locale
            ? this.nodeService.getAllChildNodes({ locale, parent: id }).pipe(
                catchError((error) => {
                  // this.toast.error(error.error.message);
                  return of([]);
                })
              )
            : of([]);
        })
      );
    });
  }

  back() {
    this.location.back();
  }

  delete() {
    const node = this.node$.value;
    if (node) {
      const confirm = window.confirm('Delete this Node?');
      if (confirm) {
        const toast = this.toast.info('Deleting node', 'Please wait...', {
          disableTimeOut: true,
        });
        this.nodeService.delete(node.id).subscribe({
          next: (r) => {
            this.toast.clear(toast.toastId);
            this.toast.success('Success!');
            this.location.back();
          },
          error: (e) => {
            this.toast.clear(toast.toastId);
            this.toast.error(e.error.message);
            if (e.error.errors) {
              Object.keys(e.error.errors).forEach((key: string) => {
                this.toast.error(e.error.errors[key]);
              });
            }
          },
        });
      }
    }
  }
}
