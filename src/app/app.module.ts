import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PostsComponent } from './pages/posts/posts.component';
import { AuthGuard } from './guards/auth-guard';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

import localePT from '@angular/common/locales/pt';
import localeExtraPT from '@angular/common/locales/extra/pt';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localePT, 'pt', localeExtraPT);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    NotFoundComponent,
    PostsComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CKEditorModule
  ],
  providers: [
    AuthGuard,
    FormBuilder,
    { provide: LOCALE_ID, useValue: 'pt' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
