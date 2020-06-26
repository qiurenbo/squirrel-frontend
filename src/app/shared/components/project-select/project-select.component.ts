import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-project-select',
  templateUrl: './project-select.component.html',
  styleUrls: ['./project-select.component.scss'],
})
export class ProjectSelectComponent implements OnInit {
  constructor() {}

  @Input()
  projectName: string;

  @Output()
  projectNameChange = new EventEmitter<string>();

  ngOnInit(): void {}

  onChange() {
    this.projectNameChange.emit(this.projectName);
  }
}
