import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BaseDomain } from '../shared/models/base-domain';

let httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('auth-token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService<T extends BaseDomain> {
  protected abstract getUrl(): string;

  constructor(public http: HttpClient) { }

  public get(id: string) {
    return this.http.get<T>(this.getUrl() + '/' + id, httpOptions).pipe(
      catchError(this.handleError<T>(`get=${1}`))
    );
  }

  public getAll(): Observable<any> {
    return this.http.get(this.getUrl(), httpOptions).pipe(
      catchError(this.handleError<T>(`getAll=${1}`))
    );
  }

  public salvar(object: T) {
    return this.http.post<T>(this.getUrl(), object, httpOptions).pipe(
      catchError(this.handleError<T>(`salvar=${1}`))
    );
  }

  public atualizar(id: string, object: T) {
    return this.http.put(this.getUrl() + '/' + id, object, httpOptions).pipe(
      catchError(this.handleError<T>(`atualizar=${1}`))
    );
  }

  public deletar(id: string) {
    return this.http.delete(this.getUrl() + '/' + id, httpOptions).pipe(
      catchError(this.handleError<T>(`delete=${1}`))
    );
  }

  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    }
  }

}
