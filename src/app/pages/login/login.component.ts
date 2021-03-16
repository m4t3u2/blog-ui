import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
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
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  private redirectPage(): void {
    window.location.replace("home");
  }

}
