import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Locales } from '../interfaces/locales.type';

@Injectable({
  providedIn: 'root',
})
export class LocaleService {
  localeSelected$: BehaviorSubject<string> = new BehaviorSubject('');
  baseUrl: string = 'https://api-graph.tests.grupoapok.com/api/';
  constructor(private http: HttpClient) {}

  getAllLocales(): Observable<Locales[]> {
    return this.http.get<Locales[]>(`${this.baseUrl}locales`);
  }
}
