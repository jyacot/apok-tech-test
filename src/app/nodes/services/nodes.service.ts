import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocaleService } from 'src/app/shared/services/locale.service';
import { DetailNode, Node } from '../../shared/interfaces/node.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  pipe() {
    throw new Error('Method not implemented.');
  }
  baseUrl: string = 'https://api-graph.tests.grupoapok.com/api/';
  constructor(private http: HttpClient, private localeService: LocaleService) {}

  getAllParentNodes(params?: { locale?: string }): Observable<Node[]> {
    return this.http.get<Node[]>(`${this.baseUrl}nodes`, { params });
  }
  getAllChildNodes(params?: {
    locale: string;
    parent: number;
  }): Observable<Node[]> {
    return this.http.get<Node[]>(`${this.baseUrl}nodes`, { params });
  }

  getNode(params: { id: number; locale: string }): Observable<DetailNode> {
    return this.http.get<DetailNode>(`${this.baseUrl}node/${params.id}`, {
      params,
    });
  }

  delete(id: any) {
    return this.http.delete<DetailNode>(`${this.baseUrl}node/${id}`);
  }

  post(params: { parent: number; locales: string[] }) {
    return this.http.post(`${this.baseUrl}node`, params);
  }
}
