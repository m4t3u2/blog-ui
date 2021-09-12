import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    private toastr: ToastrService
  ) { }

  public mostrarMensagemErro(mensagem: string) {
    this.toastr.error(mensagem,'Erro!');
  }

}
