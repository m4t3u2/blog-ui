import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Post } from 'src/app/shared/models/post';
import { Usuario } from 'src/app/shared/models/usuario';
import * as CustomEditor from '../../vendor/ckeditor5/build/ckeditor';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  public form: FormGroup;
  public usuarioLogado: Usuario;
  public Editor = CustomEditor;
  public config = {
    //Idioma definido no webpack.config.js.
    toolbar: [
      'heading', '|', 'fontfamily', 'fontsize', '|',
      'alignment', '|', 'fontColor', 'fontBackgroundColor', '|',
      'bold', 'italic', 'strikethrough', 'underline', 'subscript', 'superscript', '|',
      'link', '|', 'outdent', 'indent', '|', 'bulletedList', 'numberedList', 'todoList', '|',
      'code', 'codeBlock', '|', 'insertTable', '|', 'uploadImage', 'blockQuote', '|', 'undo', 'redo'
    ],
    image: {
      toolbar: [
        'imageStyle:full', 'imageStyle:side', '|', 'imageTextAlternative'
      ],
      styles: [
        'full',
        'side'
      ]
    }
  };

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private authService: AuthService,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this.initForm();
    let idUsuarioLogado = this.authService.getIdUsuarioLogado();
    this.usuarioService.get(idUsuarioLogado).subscribe(user => {
      this.usuarioLogado = user;
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      titulo: ['', [Validators.required]],
      texto: ['', [Validators.required]]
    });
  }

  public onSubmit(): void {
    let post: Post = new Post();
    post.date = new Date();
    post.title = this.form.controls.titulo.value;
    post.text = this.form.controls.texto.value;
    post.user = this.usuarioLogado;
    this.postService.salvar(post).subscribe(data => {
      //TODO Colocar ToastService
      this.form.reset();
    });
  }

}
