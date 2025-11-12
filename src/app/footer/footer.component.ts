import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  copyrightYear = moment().year();
  copyrightText = `${this.copyrightYear} DIANOMIC SYSTEMS INC. All Rights Reserved.`;
  constructor() { }

  ngOnInit() {
  }

}
