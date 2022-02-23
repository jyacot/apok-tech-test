import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { Locales } from 'src/app/shared/interfaces/locales.type';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { NodesService } from '../../services/nodes.service';

@Component({
  selector: 'app-node-add',
  templateUrl: './node-add.component.html',
  styleUrls: ['./node-add.component.scss'],
})
export class NodeAddComponent implements OnInit {
  locales$: BehaviorSubject<Locales[]> = new BehaviorSubject<Locales[]>([]);
  form: FormGroup;
  constructor(
    private localeService: LocaleService,
    private fb: FormBuilder,
    private nodeService: NodesService,
    private toast: ToastrService,
    public location: Location,
    private activatedRoute: ActivatedRoute
  ) {
    this.form = this.fb.group({
      parent: [null, Validators.required],
      locales: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadLocales();
    this.localeService.localeSelected$.subscribe((localeId) => {
      this.form.controls.locales.setValue([localeId]);
    });
  }

  loadLocales() {
    this.localeService
      .getAllLocales()
      .pipe(take(1))
      .subscribe((locales) => {
        this.locales$.next(locales);
      });
  }

  add() {
    this.activatedRoute.params.subscribe(({ id }) => {
      const toast = this.toast.info('Generating node', 'Please wait...', {
        disableTimeOut: true,
      });

      this.nodeService
        .post({ parent: id, locales: this.form.controls.locales.value })
        .subscribe({
          next: (r) => {
            this.toast.clear(toast.toastId);
            this.toast.success('Success!');
            this.location.back();
          },
          error: (e) => {
            this.toast.error(e.error.message);
            if (e.error.errors) {
              Object.keys(e.error.errors).forEach((key: string) => {
                this.toast.error(e.error.errors[key]);
              });
            }
          },
          complete: () => {
            this.toast.clear(toast.toastId);
          },
        });
    });
  }
}
