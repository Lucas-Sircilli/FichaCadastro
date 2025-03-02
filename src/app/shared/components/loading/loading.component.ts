/*import { Component, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  imports: [CommonModule],
  template: `
    <div class="loading-container">
      <div *ngIf="loading" @fadeInOut class="spinner"></div>
      <div *ngIf="!loading" @fadeInOut class="checkmark-container">
        <svg viewBox="0 0 52 52" class="checkmark">
          <circle class="checkmark-circle" cx="26" cy="26" r="25" fill="none" />
          <path class="checkmark-check" fill="none" d="M14 27l8 8 16-16" />
        </svg>
      </div>
    </div>
  `,
  styles: [
    `
    .loading-container {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;
    }

    .spinner {
      width: 40px;
      height: 40px;
      border: 4px solid rgba(0, 0, 0, 0.1);
      border-top: 4px solid #3498db;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .checkmark-container {
      width: 52px;
      height: 52px;
    }

    .checkmark {
      width: 100%;
      height: 100%;
      stroke-width: 4;
      stroke: #2ecc71;
      stroke-linecap: round;
      stroke-linejoin: round;
      fill: none;
    }

    .checkmark-circle {
      stroke-dasharray: 157;
      stroke-dashoffset: 157;
      animation: draw-circle 0.6s ease-in-out forwards;
    }

    .checkmark-check {
      stroke-dasharray: 36;
      stroke-dashoffset: 36;
      animation: draw-check 0.3s 0.6s ease-in-out forwards;
    }

    @keyframes draw-circle {
      0% { stroke-dashoffset: 157; }
      100% { stroke-dashoffset: 0; }
    }

    @keyframes draw-check {
      0% { stroke-dashoffset: 36; }
      100% { stroke-dashoffset: 0; }
    }
    `
  ],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class LoadingComponent {
  @Input() loading: boolean = true;
}*/
