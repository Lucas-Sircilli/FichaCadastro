import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from '../../../core/services/messages/messages.service';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessageComponent {

  constructor(public messageService: MessageService) {}

  getMessageClass(type: string | null): string {
    switch (type) {
      case 'error':
        return 'message-error';
      case 'success':
        return 'message-success';
        case 'info':
        return 'message-info';
      default:
        return 'message-empty';
    }
    console.log(type);
  }
}
