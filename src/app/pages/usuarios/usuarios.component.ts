import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/shared/models/usuario';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  public errorMessage = '';
  public usuarios: Usuario[];

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.buscarTodosUsuario();
  }

  public buscarTodosUsuario(): void {
    this.service.getAll().subscribe(data => {
      this.usuarios = data;
    },
      err => {
        this.errorMessage = err.error;
      });
  }

}
