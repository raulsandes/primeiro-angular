import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  buttonName = 'Show';
  show = false;

  constructor() { 
  }

  ngOnInit(): void {
  }

  togle() {
    this.show = !this.show;

    if(this.show){
      this.buttonName = 'Hide'
    }
    else {
      this.buttonName = 'Show'
    }

  }

}
