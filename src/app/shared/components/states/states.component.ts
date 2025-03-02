import { Component, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { states } from '../../../../assets/states';

@Component({
  selector: 'app-states',
  standalone: true,
  imports: [CommonModule, NgSelectModule, FormsModule],
  template: `
    <ng-select
      #ngSelectStateComponent 
      [items]="States" 
      bindLabel="Estado" 
      bindValue="UF" 
      [(ngModel)]="selectedState"
      (change)="onChange($event)"
      placeholder="Selecione um estado"
      notFoundText="Nenhum estado encontrado"
      [compareWith]="compareFn"
      [clearable]="true">
    </ng-select>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StatesComponent),
      multi: true
    }
  ]
})
export class StatesComponent implements ControlValueAccessor {
  States = states;
  selectedState: string = '';
  @ViewChild('ngSelectStateComponent') ngSelectStateComponent!: NgSelectComponent;

  @Input() set uf(value: string) {
    if (value) {
      this.selectState(value);
    }
  }

  @Output() stateSelected = new EventEmitter<string>();

  onChange = (value: string) => {
    this.selectedState = value;
    this.stateSelected.emit(value);
  };

  onTouched = () => {};

  writeValue(value: any): void {
    this.selectState(value);
  }

  

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  compareFn = (option: any, value: any) => {
  return option?.UF === value;
  }

  clearState() {
    if (this.ngSelectStateComponent) {
      this.ngSelectStateComponent.clearModel(); // Chama o método interno do ng-select
    }
  }


  private selectState(value: string): void {
    const state = this.States.find(s => s.UF === value);
    console.log(state);
    if (state) {
      this.selectedState = state.UF;
    }
  }
}
