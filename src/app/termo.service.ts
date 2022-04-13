import { Injectable } from '@angular/core';
import { LetterGuess } from './letter-guess';
import { dict } from './post-list/dict-termo';

@Injectable({
  providedIn: 'root'
})
export class TermoService {

  constructor() { }
  
  // Initial State
   words = dict.map ( s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, "") );
   printMnot = dict.map ( s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, "") );
   printMust = dict.map ( s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, "") );
   printHere = dict.map ( s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, "") );
   printDont = dict.map ( s => s.normalize('NFD').replace(/[\u0300-\u036f]/g, "") );
   musts: string[] = [];
   donts: string[] = [];
   state: State[] = [
      { dont: [] },
      { dont: [] },
      { dont: [] },
      { dont: [] },
      { dont: [] },
  ];
  
     addGuess = ( guess: LetterGuess[] ): void => {
      guess.forEach ( (g, i) => {
          if ( g.here ) { 
              this.state[i].letter = g.letter;
          } else {
              this.state[i].dont.push(g.letter);
          }
          if ( g.has ) { 
              this.musts.push(g.letter);
          } else {
            this.donts.push(g.letter);
          }
          console.log(this.musts, this.donts)

      }); 
      console.log({ guess, musts: this.musts, state: this.state })
  }

     search = (): any => {
      // test if all tests are true
      const all = (a: any, b: any) => a && b;
      
      // Check for all words that dont have *donts*  represents grey color
      const mnot = (w: string): boolean => this.donts.map(l => !w.includes(l)).reduce(all,true);
  
      // Check if all letters in *musts* are present in *w* represents yellow color
      const must = (w: string): boolean => this.musts.map(l => w.includes(l)).reduce(all,true);
      
      // Check for all words with letters in right positions  represents green color
      const here = (w: string): boolean => [...w].map ((l, i) => (this.state[i].letter === undefined || this.state[i].letter === l)).reduce(all,true);
  
      // Reject words with known wrong letters    
      const dont = (w: string): boolean => [...w].map((l,i) => !this.state[i].dont.includes(l)).reduce(all,true);
      
      
      // Filter by all criteria
      const printMnot = this.words.filter(mnot);
      const printMust = this.words.filter(must);
      const printHere = this.words.filter(here);
      const printDont = this.words.filter(dont);

      this.words = this.words.filter(mnot);
      console.log(this.words)
      this.words = this.words.filter(must)
      console.log(this.words)
      this.words = this.words.filter(here)
      console.log(this.words)
      this.words = this.words.filter(dont);
      console.log(this.words)

      return {printMnot, printMust, printHere, printDont, words: this.words}
  }
}

interface State {
  letter?: string, dont: string[]
}