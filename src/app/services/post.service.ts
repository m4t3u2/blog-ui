import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Post } from '../shared/models/post';
import { BaseService } from './base.service';

const AUTH_API = environment.apiUrl + '/posts';

const httpOptionsSemAuth = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostService extends BaseService<Post>{

  protected getUrl(): string {
    return AUTH_API;
  }

  constructor(public http: HttpClient) {
    super(http);
  }

  public buscarTodos(): Observable<any> {
    return this.http.get(this.getUrl(), httpOptionsSemAuth).pipe(
      catchError(this.handleError<Post>(`buscarTodos=${1}`))
    );
  }

}
