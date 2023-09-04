import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbDateStruct, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { horarios } from './horarios';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  @Output() calendario = new EventEmitter<NgbDate>();

	model!: NgbDateStruct;
	date!: { year: number; month: number };

  navigation = 'none';
  outsideDays = 'collapsed';
  displayMonths = 3;
  markDisabled: any = null;


	constructor(private calendar: NgbCalendar) {
    this.markDisabled = (date: NgbDate) => {
      const today: Date = new Date()
      const month: number = today.getMonth()
      return this.calendar.getWeekday(date) > 6 || (date.day <= today.getDate() && month + 1 === date.month)
    }

  }

  ngOnInit(): void {}

  getdateSelect(date: NgbDate){
    this.calendario.emit(date)
  }
}
