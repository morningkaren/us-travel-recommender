import { Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-state-modal',
  templateUrl: './state-modal.component.html',
  styleUrls: ['./state-modal.component.css']
})
export class StateModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }


}
