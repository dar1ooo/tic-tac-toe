import { Component, OnInit } from '@angular/core';
import { Board } from './models/board.component';
import { Square } from './models/square.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public board = new Board();
  public isPlayerOneTurn = true;
  public headerMessage = '';
  public PlayerWon = false;
  public AiEnabled = true;
  public AiPlayed = false;

  ngOnInit(): void {
    this.ResetBoard();
  }

  public ResetBoard(): void {
    this.headerMessage = 'Turn : Player One';
    this.board = new Board();
    for (let i = 0; i < 9; i++) {
      const square = new Square();
      this.board.Squares.push(square);
    }
    if (this.AiEnabled) {
      this.AiPlayed = false;
    }
    this.isPlayerOneTurn = true;
    this.PlayerWon = false;
  }

  public SetAi(): void {
    this.AiEnabled ? (this.AiEnabled = false) : (this.AiEnabled = true);
  }

  public SquareClicked(square: number): void {
    if (this.board.Squares[square].content === '' && !this.PlayerWon) {
      this.isPlayerOneTurn
        ? (this.board.Squares[square].content = 'X')
        : (this.board.Squares[square].content = 'O');
      this.isPlayerOneTurn
        ? (this.isPlayerOneTurn = false)
        : (this.isPlayerOneTurn = true);
      if (this.CheckForWinner()) {
        if (this.isPlayerOneTurn) {
          this.headerMessage = 'Player two has won';
          this.PlayerWon = true;
        } else {
          this.headerMessage = 'Player one has won';
          this.PlayerWon = true;
        }
      }
      if (!this.PlayerWon) {
        if (this.isPlayerOneTurn) {
          this.headerMessage = 'Turn : Player One';
        } else {
          this.headerMessage = 'Turn : Player Two';
        }
        if (this.AiEnabled && !this.AiPlayed) {
          let squareIsEmpty = false;
          do {
            let chosenSquare = Math.floor(Math.random() * 10);
            squareIsEmpty = this.board.Squares[chosenSquare].content === '';
            if (squareIsEmpty) {
              this.AiPlayed = true;
              this.SquareClicked(chosenSquare);
            }
          } while (!squareIsEmpty);
        } else {
          this.AiPlayed = false;
        }
      }
      this.CheckForDraw();
    }
  }

  public CheckForDraw(): void {
    if (
      this.board.Squares[0].content != '' &&
      this.board.Squares[1].content != '' &&
      this.board.Squares[2].content != '' &&
      this.board.Squares[3].content != '' &&
      this.board.Squares[4].content != '' &&
      this.board.Squares[5].content != '' &&
      this.board.Squares[6].content != '' &&
      this.board.Squares[7].content != '' &&
      this.board.Squares[8].content != '' &&
      !this.PlayerWon
    ) {
      this.headerMessage = 'Draw, Better luck next time';
    }
  }

  public CheckForWinner(): boolean {
    if (
      this.board.Squares[0].content === this.board.Squares[1].content &&
      this.board.Squares[1].content === this.board.Squares[2].content &&
      this.board.Squares[0].content != '' &&
      this.board.Squares[1].content != '' &&
      this.board.Squares[2].content != ''
    ) {
      return true;
    }
    if (
      this.board.Squares[3].content === this.board.Squares[4].content &&
      this.board.Squares[4].content === this.board.Squares[5].content &&
      this.board.Squares[3].content != '' &&
      this.board.Squares[4].content != '' &&
      this.board.Squares[5].content != ''
    ) {
      return true;
    }
    if (
      this.board.Squares[6].content === this.board.Squares[7].content &&
      this.board.Squares[7].content === this.board.Squares[8].content &&
      this.board.Squares[6].content != '' &&
      this.board.Squares[7].content != '' &&
      this.board.Squares[8].content != ''
    ) {
      return true;
    }
    if (
      this.board.Squares[0].content === this.board.Squares[3].content &&
      this.board.Squares[3].content === this.board.Squares[6].content &&
      this.board.Squares[0].content != '' &&
      this.board.Squares[3].content != '' &&
      this.board.Squares[6].content != ''
    ) {
      return true;
    }
    if (
      this.board.Squares[1].content === this.board.Squares[4].content &&
      this.board.Squares[4].content === this.board.Squares[7].content &&
      this.board.Squares[1].content != '' &&
      this.board.Squares[4].content != '' &&
      this.board.Squares[7].content != ''
    ) {
      return true;
    }
    if (
      this.board.Squares[2].content === this.board.Squares[5].content &&
      this.board.Squares[5].content === this.board.Squares[8].content &&
      this.board.Squares[2].content != '' &&
      this.board.Squares[5].content != '' &&
      this.board.Squares[8].content != ''
    ) {
      return true;
    }

    if (
      this.board.Squares[0].content === this.board.Squares[4].content &&
      this.board.Squares[4].content === this.board.Squares[8].content &&
      this.board.Squares[0].content != '' &&
      this.board.Squares[4].content != '' &&
      this.board.Squares[8].content != ''
    ) {
      return true;
    }

    if (
      this.board.Squares[2].content === this.board.Squares[4].content &&
      this.board.Squares[4].content === this.board.Squares[6].content &&
      this.board.Squares[2].content != '' &&
      this.board.Squares[4].content != '' &&
      this.board.Squares[6].content != ''
    ) {
      return true;
    } else {
      return false;
    }
  }
}
