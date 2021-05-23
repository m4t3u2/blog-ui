import { Component, OnInit, ViewChild } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
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
  public columns = [];
  public rows = [];
  public filter = [];
  public limit = 5;

  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(private service: UsuarioService) { }

  ngOnInit(): void {
    this.buscarTodosUsuario();
    this.initColums();
  }

  private buscarTodosUsuario(): void {
    this.service.getAll().subscribe(data => {
      this.usuarios = data;
      this.initRows();
    },
      err => {
        this.errorMessage = err.error;
      });
  }

  private initColums(): void {
    this.columns = [
      { prop: 'id', name: 'ID', width: 80 },
      { prop: 'name', name: 'Nome', width: 150 },
      { prop: 'username', name: 'Login', width: 150 },
      { prop: 'email', name: 'E-mail', width: 160 },
      { prop: 'LogTimeStamp', name: 'Bloquear/Desbloquear', width: 160 }
    ];
  }

  private initRows(): void {
    this.rows = this.usuarios
    this.filter = this.usuarios;
  }

  public updateFilter(event): void {
    const val = event.target.value.toLowerCase();
    const temp = this.filter.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

}
