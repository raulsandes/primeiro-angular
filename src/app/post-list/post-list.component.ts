import { Component, OnInit } from '@angular/core';
import { LetterGuess } from '../letter-guess';
import { TermoService } from '../termo.service';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  words: string[] = [];
  printMnot: string[] = [];
  printMust: string[] = [];
  printHere: string[] = [];
  printDont: string[] = [];

  letters: LetterGuess[] = Array(5).fill(0).map(_=> ({
    letter: '',
    has: false,
    here: null
  }));

  constructor(private termo:TermoService) { }

  ngOnInit(): void {
  }
  

  toggleState(i: number) {
    console.log(i)
    if(!this.letters[i].has){
      this.letters[i].has = true;
      this.letters[i].here = false;   
    }
   else if(this.letters[i].has && this.letters[i].here){
      this.letters[i].has = false;
      this.letters[i].here = null;
    }
    else {
      this.letters[i].has = true;
      this.letters[i].here = true;
    }
  }

  newGuess() {
      this.termo.addGuess(this.letters);  
      // this.words = this.termo.search();
      // this.printMnot = this.termo.search2();
      // this.printMust = this.termo.search3();
      // this.printHere = this.termo.search4(); 
      // this.printDont = this.termo.search5();
      const result = this.termo.search();
      this.words = result.words;
      this.printMnot = result.printMnot;
      this.printMust = result.printMust;
      this.printHere = result.printHere;
      this.printDont = result.printDont;
  }

}
