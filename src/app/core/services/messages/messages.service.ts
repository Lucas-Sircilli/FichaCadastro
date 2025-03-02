import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSubject = new BehaviorSubject<{ text: string | null, type: string | null }>({ text: null, type: null });
  message$ = this.messageSubject.asObservable();

  showMessage(message: string, type: string, duration: number = 6000) {
    this.messageSubject.next({ text: message, type: type });
    setTimeout(() => this.clearMessage(), duration);
  }

  clearMessage() {
    this.messageSubject.next({ text: null, type: null });
  }

  checkFormErrors(userForm: FormGroup): void {
    let errorMap: { [key: string]: string[] } = {}; // Mapeia erro -> lista de campos
  
    Object.keys(userForm.controls).forEach(field => {
      const control = userForm.get(field);
  
      if (control && control.invalid && control.errors) {
        Object.keys(control.errors).forEach(errorKey => {
          if ((errorKey === 'mask' && field === 'documentoContribuinte')) {
            return;
          }
          if (!errorMap[errorKey]) {
            errorMap[errorKey] = [];
          }
          errorMap[errorKey].push(field); // Adiciona o campo no erro correspondente
        });
      }
    });
  
    let mensagensErro: string[] = [];
    Object.keys(errorMap).forEach(errorKey => {
      const campos = errorMap[errorKey].join(', ');
      let mensagemErro = this.getErrorMessage(errorKey, errorMap[errorKey].length);
      if (errorKey === 'cpfInvalido' || errorKey === 'cnpjInvalido') {
      mensagensErro.push(` ${mensagemErro}`);
      }
    else
      {
        mensagensErro.push(`${campos} ${mensagemErro}`);
      }
    });
  
    if (mensagensErro.length > 0) {
      this.showMessage('O(s) campo(s) a seguir estão inválidos: ' + mensagensErro.join('; ') + '.', 'error');
    }
  }
  
  getErrorMessage(errorKey: string, quantidade: number): string {
    const messages: { [key: string]: { singular: string, plural: string } } = {
      required: { singular: 'é obrigatório', plural: 'são obrigatórios' },
      minlength: { singular: 'não atende ao tamanho mínimo', plural: 'não atendem ao tamanho mínimo' },
      maxlength: { singular: 'excede o tamanho máximo permitido', plural: 'excedem o tamanho máximo permitido' },
      pattern: { singular: 'possui um formato inválido', plural: 'possuem um formato inválido' },
      email: { singular: 'não é um e-mail válido', plural: 'não são e-mails válidos' },
      cpfInvalido: { singular: 'o CPF informado é inválido', plural: 'os CPFs informados são inválidos' },
      cnpjInvalido: { singular: 'o CNPJ informado é inválido', plural: 'os CNPJs informados são inválidos' },
      mask:{singular: 'possui um formato inválido', plural: 'possuem um formato inválido' },
      excedeuTamanhoMaximo:{singular:'excedeu o tamanho máximo', plural: 'excederam o tamanho máximo'}
    };
  
    return messages[errorKey] 
      ? (quantidade > 1 ? messages[errorKey].plural : messages[errorKey].singular) 
      : 'possui um erro desconhecido';
  }
  
}
