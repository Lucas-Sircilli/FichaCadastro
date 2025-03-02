import { Component } from '@angular/core';
import { VideoComponent } from '../../../../shared/components/video/video.component';
import { UsersService } from '../../../../core/services/users/users.service';
import { MessageService } from '../../../../core/services/messages/messages.service';

@Component({
  selector: 'app-login',
  imports: [VideoComponent],
  standalone:true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{ 

  constructor(private usersService: UsersService, private messageService: MessageService){}

  onclick(): void 
  {
    
      //this.userForm.value.dataCadastro = Date.now;
      /*this.usersService.createUser(this.userForm.value).subscribe({
        next: (response) => {
          this.showMessage('Usuário cadastrado com sucesso!', 'success');
          this.userForm.reset();
          //this.userForm.get('cc')?.setValue('+');
      },
      error: (error) => {
        this.showMessage('Erro ao cadastrar usuário:' + error.error.message, 'error');
      }
      });*/
  }
}
