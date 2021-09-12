import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  public isLoggedIn = false;
  public isLoginFailed = false;
  public errorMessage = '';
  public roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private mensagemService: MensagemService,
    private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = this.authService.isAuthenticated();
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      usuario: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.roles = this.tokenStorage.getUser().roles;
        this.redirectPage();
      },
      err => {
        this.errorMessage = err.error.message ?? 'Servidor indisponível.';
        this.mensagemService.mostrarMensagemErro(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }

  private redirectPage(): void {
    window.location.replace("home");
  }

}
