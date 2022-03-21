import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import {Router} from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  public submitting = false;
  public output = '';
  public hour;

  constructor(
    private router: Router,
  ) {
    setInterval(this.refreshTime, 2000);
  }

  async ngOnInit() {
    this.refreshTime();
  }

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

  redirect = (direction) => {
    this.router.navigateByUrl('/' + direction);
  };

  refreshTime = () => {
    if (moment().format('h:mm:ss a').includes('pm')) {
      let cut;
      for (let i = 0; i < moment().format('h:mm:ss a').length; i++) {
        if (moment().format('h:mm:ss a')[i] === ':') {
          cut = i;
          i = moment().format('h:mm:ss a').length;
        }
      }
      this.hour = (Number(moment().format('h:mm:ss a').slice(0, cut)) + 12)
        .toString() + moment().format('h:mm:ss a')
        .slice(cut, moment().format('h:mm:ss a').length - 6);
      if (this.hour[0] === '2' && this.hour[1] === '4') {
        this.hour = '12' + this.hour.slice(2, this.hour.length);
      }
    } else {
      this.hour = moment().format('h:mm:ss a')
        .slice(0, moment().format('h:mm:ss a').length - 6);
      if (this.hour[0] === '1' && this.hour[1] === '2') {
        this.hour = '00' + this.hour.slice(2, this.hour.length);
      }
    }
  };

}
