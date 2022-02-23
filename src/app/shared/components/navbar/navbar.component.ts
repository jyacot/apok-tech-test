import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { Locales } from '../../interfaces/locales.type';
import { LocaleService } from '../../services/locale.service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  exitIcon = faArrowRight;
  locales$: Observable<Locales[]>;
  form: FormGroup;
  constructor(private localeService: LocaleService, private fb: FormBuilder) {
    this.form = this.fb.group({ locale: [null, Validators.required] }); //Definimos el formulario de locale
    this.locales$ = this.localeService.getAllLocales().pipe(
      take(1), // Con hacerse sólo la primera vez es suficiente
      //En caso de no tener aún locale se coloca una por defeto
      tap((locales) => {
        if (!this.form.get('locale')?.value) {
          this.form.controls.locale.setValue(locales[0].locale);
        }
      })
    );
  }

  ngOnInit(): void {
    // Al iniciar el navbar se consultan los idiomas disponibles
    this.form.controls.locale.valueChanges.subscribe((v) => {
      this.localeService.localeSelected$.next(v);
    });
  }
}
