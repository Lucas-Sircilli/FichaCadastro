import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { VideoComponent } from '../../../shared/components/video/video.component';
import { PhoneComponent } from '../../../shared/components/phone/phone.component';
import { StatesComponent } from '../../../shared/components/states/states.component';
import { UsersService } from '../../../core/services/users/users.service';
import { User } from '../models/users/users.model';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { NgIf } from '@angular/common'; 
import { NgxMaskDirective } from 'ngx-mask';
import { validarDocumento, validarTamanhoMaximo } from '../../../core/services/users/customValidators';
import { MessageService } from '../../../core/services/messages/messages.service';
import { MessageComponent } from "../../messages/components/messages.component";
import { ViaCep } from '../models/users/viaCep.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [VideoComponent, PhoneComponent, StatesComponent, ReactiveFormsModule, CommonModule, NgIf, NgxMaskDirective, MessageComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  animations: [
    trigger('expandAnimationbutton', [
      state('void', style({ height: '0px', opacity: 0, overflow: 'hidden' })), // Estado inicial (escondido)
      state('*', style({ height: '*', opacity: 1 })), // Estado final (expanso)
      transition('void <=> *', [animate('400ms ease-in-out')]), // Animação entre os estados
    ])
  ],
})
export class UsersComponent  implements OnInit {

  userForm: FormGroup;
  isEnderecoVisible = false;
  htmlContent = 'Documento';
  typeDocumentoContribuinte = '';
  @ViewChild('estadoPrincipal') estadoPrincipal!: StatesComponent;
  @ViewChild('estadoEnderecoAdicional') estadoEnderecoAdicional!: StatesComponent;
  @ViewChild(PhoneComponent) phoneComponent!: PhoneComponent;

  

  constructor(private renderer: Renderer2,private fb: FormBuilder, private usersService: UsersService, private messageService: MessageService) {
    
    this.userForm = this.fb.group({
      nome: ['', [Validators.required,validarTamanhoMaximo(80)]],
      email: ['', [Validators.required, Validators.email, validarTamanhoMaximo(50)]],
      tipoUsuario: ['', Validators.required],
      cc: ['', [Validators.required, validarTamanhoMaximo(5)]],
      ddd: ['', Validators.required],
      telefone: ['', [Validators.required, validarTamanhoMaximo(15)]],
      documentoContribuinte: ['', [Validators.required, validarDocumento, validarTamanhoMaximo(15)]],
      logradouro: ['', [Validators.required, validarTamanhoMaximo(100)]],
      numeroEndereco: ['', [Validators.required, validarTamanhoMaximo(10)]],
      cep: ['', [Validators.required, validarTamanhoMaximo(9)]],
      cidade: ['', [Validators.required, validarTamanhoMaximo(100)]],
      bairro: ['', [Validators.required, validarTamanhoMaximo(80)]],
      uf: ['', [Validators.required, validarTamanhoMaximo(2)]],
      complementoEndereco: ['', [validarTamanhoMaximo(80)]],
      logradouroEnderecoAdicional: ['', [validarTamanhoMaximo(100)]],
      numeroEnderecoAdicional: ['', [validarTamanhoMaximo(10)]],
      cepEnderecoAdicional: ['', [validarTamanhoMaximo(9)]],
      cidadeEnderecoAdicional: ['', [validarTamanhoMaximo(100)]],
      ufEnderecoAdicional: ['', [validarTamanhoMaximo(2)]],
      bairroEnderecoAdicional: ['', [validarTamanhoMaximo(80)]],
      complementoEnderecoAdicional: ['', [validarTamanhoMaximo(80)]]

      
      
    });
  }

  showMessage(mensagem:string, type: string) {
    this.messageService.showMessage(mensagem, type);
  }

  ngOnInit(): void {}

  onSubmit(): void 
  {
    if (this.userForm.valid) {
      this.usersService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          this.showMessage('Usuário cadastrado com sucesso!', 'success');
          this.userForm.reset();
          this.estadoPrincipal?.clearState(); // Limpa estado principal
          this.estadoEnderecoAdicional?.clearState(); // Limpa estado de endereço adicional
          this.phoneComponent.clearState();
          
      },
      error: (error) => {
        console.log(error);
        this.showMessage('Erro ao cadastrar usuário:' + error.error.message, 'error');
      }
      });
    } 
    else 
    {

    this.messageService.checkFormErrors(this.userForm);

    }
  }

  onFocusOut(numero:number){
    let control: any;
    switch(numero){

      case 1:
        control = this.userForm.get('cep');
      break;

      case 2:
        control = this.userForm.get('cepEnderecoAdicional');
      break;
      
    }
    if (control?.valid) {
      this.usersService.getEnderecoByCEP(control.value).subscribe({
        next: (response) => {
          const retorno = response as ViaCep;
          switch(numero){
            
            case 1:

            this.userForm.patchValue({
              logradouro: retorno.logradouro,
              bairro: retorno.bairro,
              cidade: retorno.localidade,
              uf: retorno.uf 
            });
            
            this.onStateSelected(retorno.uf);

            /*  this.userForm.get('logradouro')?.setValue(retorno.logradouro);
              this.userForm.get('cidade')?.setValue(retorno.localidade);
              this.userForm.get('bairro')?.setValue(retorno.bairro);
              this.userForm.get('uf')?.setValue(retorno.uf);*/
              
            break;
            
            case 2:

              this.userForm.patchValue({
                logradouroEnderecoAdicional: retorno.logradouro,
                bairroEnderecoAdicional: retorno.bairro,
                cidadeEnderecoAdicional: retorno.localidade,
                ufEnderecoAdicional: retorno.uf 
              });
              
              this.onStateAditionalSelected(retorno.uf);

              /*this.userForm.get('logradouroEnderecoAdicional')?.setValue(retorno.logradouro);
              this.userForm.get('cidadeEnderecoAdicional')?.setValue(retorno.localidade);
              this.userForm.get('bairroEnderecoAdicional')?.setValue(retorno.bairro);*/

            break;
          }
        },
        error: (error) => {
          this.showMessage('Erro ao retornar as informações do CEP:' + error, 'error');
        }
      });
    }
    else{
      this.showMessage('O CEP informado não é válido!','error');
    }
  }

  toggleEndereco() {
    this.isEnderecoVisible = !this.isEnderecoVisible;
    const container = document.getElementById('container-user');

    if (container) {
      const newHeight = this.isEnderecoVisible ? '75%' : '60%';
      this.renderer.setStyle(container, 'height', newHeight);
    }
  }

  onPhoneCodeSelected(value: string) {
    this.userForm.get('cc')?.setValue(value);
  }

  onStateSelected(value: any) {
    if (value && typeof value === 'object' && value.UF) {
      this.userForm.get('uf')?.setValue(value.UF);
    } 
    else 
    {
      this.userForm.get('uf')?.setValue('');
    }
  }

  onStateAditionalSelected(value: any) {
    if (value && typeof value === 'object' && value.UF) {
      this.userForm.get('ufEnderecoAdicional')?.setValue(value.UF); 
    } 
    else 
    {
      this.userForm.get('ufEnderecoAdicional')?.setValue(''); 
    }
  }
  


  onTipoContribuinteSelected(value: string) {

    switch(value){
      case "1":
        this.htmlContent = "Pessoa Física (CPF)";
      break;

      case "2":
        this.htmlContent = "Pessoa Jurídica (CNPJ)";
      break;

      default:
        return;
      break;
    }
    this.typeDocumentoContribuinte = value;
    this.userForm.get('documentoContribuinte')?.setValue('');
  }

}