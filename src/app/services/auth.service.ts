import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { TokenStorageService } from './token-storage.service';
import { environment } from 'src/environments/environment';

const AUTH_API = environment.apiUrl + '/auth';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService) { }

  login(form: FormGroup): Observable<any> {
    return this.http.post(AUTH_API + '/login', {
      usuario: form.controls.usuario.value,
      senha: form.controls.senha.value
    }, httpOptions);
  }

  public signOut(): void {
    window.sessionStorage.clear();
    window.location.replace("login");
  }

  public isAuthenticated(): boolean {
    const token = this.tokenStorage.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  public getIdUsuarioLogado(): string {
    return this.tokenStorage.getUser().id;
  }

}