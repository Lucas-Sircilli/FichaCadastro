import { AbstractControl, ValidationErrors } from '@angular/forms';

export function validarCPF(cpf: string): boolean {
  cpf = cpf.replace(/\D/g, '');

  if (!cpf || cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let soma = 0, resto;
  for (let i = 1; i <= 9; i++) soma += parseInt(cpf[i - 1]) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[9])) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) soma += parseInt(cpf[i - 1]) * (12 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf[10])) return false;

  return true; // CPF válido
}




export function validarCNPJ(cnpj: string): boolean {
  cnpj = cnpj.replace(/\D/g, '');

  if (cnpj.length !== 14) return false; 

  let soma = 0;
  let pos = cnpj.length - 7;

  for (let i = cnpj.length - 7; i >= 1; i--) {
    soma += Number(cnpj.charAt(cnpj.length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(cnpj.charAt(0))) return false;

  soma = 0;
  pos = cnpj.length - 7;

  for (let i = cnpj.length - 7; i >= 1; i--) {
    soma += Number(cnpj.charAt(cnpj.length - i)) * pos--;
    if (pos < 2) pos = 9;
  }

  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== Number(cnpj.charAt(1))) return false;

  return true; // CNPJ válido
}


export function validarDocumento(control: AbstractControl): ValidationErrors | null {
    const tipoDocumento = control.parent?.get('tipoUsuario')?.value; // Obtém o tipo (1 = CPF, 2 = CNPJ)
    const valor = control.value?.trim() || '';
  
    if (!valor) return null;
    if (tipoDocumento === '1') {
      return validarCPF(valor) ? null : { cpfInvalido: true };
    } else if (tipoDocumento === '2') {
      return validarCNPJ(valor) ? null : { cnpjInvalido: true };
    }
  
    return null;
  }

  export function validarTamanhoMaximo(maxLength: number): ValidationErrors {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value.length > maxLength) {
        return { excedeuTamanhoMaximo: true };
      }
      return null;
    }
  }
