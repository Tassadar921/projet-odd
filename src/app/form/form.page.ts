import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  public submitting = false;
  public output = '';

  constructor() { }

  ngOnInit() {}

  toggleSubmitting = () => {
    this.submitting = !this.submitting;
    if(!this.submitting){
      this.output = 'Server response : Data saved';
    }
  };

  submit = () => {
    this.toggleSubmitting();
    setTimeout(this.toggleSubmitting, 3000);
  };

}
