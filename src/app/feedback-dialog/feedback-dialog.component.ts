import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-feedback-dialog',
  templateUrl: './feedback-dialog.component.html',
  styleUrls: ['./feedback-dialog.component.scss']
})
export class FeedbackDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
