import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredContent = 'No content yet';
  enteredTitle = '';
  newEnteredContent = ''

  onAddPost() {
    this.enteredContent = 'Voce digitou: ' + this.newEnteredContent 
  }

  constructor() { }

  ngOnInit(): void {
  }

}
