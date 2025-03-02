import { Component, EventEmitter, forwardRef, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { countries } from '../../../../assets/countries';

@Component({
  selector: 'app-phone',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule],
  template: `
    <ng-select 
    #ngSelectPhoneComponent 
  [items]="Countries"
  bindLabel="name"
  bindValue="dialCode"
  placeholder="Código de país"
  [(ngModel)]="selectedValue"
  (change)="onChange($event)"
  notFoundText="Nenhum país encontrado"
  [searchFn]="customSearch"
  [clearable]="true"
>
<ng-template ng-label-tmp let-item="item">
  <span *ngIf="item.code" [class]="'flag-icon flag-icon-' + item.code.toLowerCase()"></span>
  (+{{ item.dialCode }})
</ng-template>

<ng-template ng-option-tmp let-item="item">
  <span *ngIf="item.code" [class]="'flag-icon flag-icon-' + item.code.toLowerCase()"></span>
  (+{{ item.dialCode }})
</ng-template>
    </ng-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneComponent),
      multi: true
    }
  ]
})
export class PhoneComponent implements ControlValueAccessor {
  Countries = countries;
  selectedValue: string = '';
  @Output() phoneCodeSelected = new EventEmitter<string>();
  @ViewChild('ngSelectPhoneComponent') ngSelectPhoneComponent!: NgSelectComponent; // Referência ao ng-select
  

  onChange = (value: any) => {
    if (value && value.dialCode) {
      const formattedDialCode = `+${value.dialCode}`;
      this.phoneCodeSelected.emit(formattedDialCode);
    }
    else
    {
      this.phoneCodeSelected.emit('+');
    }
  };
  onTouched = () => {};

  writeValue(value: any): void {
    this.selectedValue = '+' + value.dialCode;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  clearState() {
    if (this.ngSelectPhoneComponent) {
      this.ngSelectPhoneComponent.clearModel(); // Chama o método interno do ng-select
    }
  }

   // Função personalizada para pesquisar pelo nome ou código DDI
   customSearch(term: string, item: any): boolean {
    if (!term) return true;

    const termLower = term.toLowerCase();
    return item.name.toLowerCase().includes(termLower) || 
           item.dialCode.includes(term);
  }
}
