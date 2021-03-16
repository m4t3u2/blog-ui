import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Usuario } from '../shared/models/usuario';
import { BaseService } from './base.service';

const AUTH_API = environment.apiUrl + '/user';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends BaseService<Usuario>{

  protected getUrl(): string {
    return AUTH_API;
  }

  constructor(public http: HttpClient) {
    super(http);
  }

}
