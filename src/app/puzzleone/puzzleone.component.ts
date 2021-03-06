import { TimerComponent } from '../timer/timer.component';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-puzzleone',
  templateUrl: './puzzleone.component.html',
  styleUrls: ['./puzzleone.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PuzzleoneComponent implements OnInit {

  riddle = document.createElement("div");
  solved = false;

  //Bietet kompletten Zugriff auf die TimerComponent
  @ViewChild(TimerComponent)
  private timer: TimerComponent;

  constructor() { }

  ngOnInit(): void {

    //setTimeout(() => this.solved = true, 5000);

    this.riddle.id = "riddle";
    document.getElementById("puzzleContainer").appendChild(this.riddle);

    //shuffle the parts
    const puzzlePartsIdx = this.shufflePuzzleParts();

    //add pictures for random puzzle
    for (let i = 0; i < puzzlePartsIdx.length; i++) {
      const img = document.createElement("img");
      const imgId = "part" + puzzlePartsIdx[i];

      img.setAttribute("src", "assets/puzzleone/img" + puzzlePartsIdx[i] + ".jpg");
      img.setAttribute("alt", imgId);
      img.setAttribute("id", imgId);

      img.addEventListener("click", () => {
        const currentImgId = img.getAttribute("id")!;
        const imgElement = document.getElementById(currentImgId)!;

        if (!this.isSolved()) {
          if (this.isSelectable()) {

            const firstSelectedPuzzlePartId = this.getAlreadySelectedPicId();

            //set opacity for clicked element
            imgElement.style.opacity = "1.0";
            if (imgElement.style.opacity != "0.6") {
              imgElement.style.opacity = "0.6";
            }

            //swap parts, when more than 1 part is selected
            if (this.countSelected() > 1) {
              if (this.areNeighbours(firstSelectedPuzzlePartId, currentImgId)) {
                this.swapParts();
              }
              this.resetOpacity();
            }
          }
        }
      });

      this.riddle.appendChild(img);
    }
  }

  passedSecond(secs: number):void {
    console.log(secs);
  }

  isSelectable(): boolean {
    return this.countSelected() <= 1;
  }


  countSelected(): number {
    const pics = this.riddle.getElementsByTagName("img");
    let counter = 0;

    // count selected elements
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        counter++;
      }
    }

    return counter;
  }

  getAlreadySelectedPicId(): string {
    const pics = this.riddle.getElementsByTagName("img");
    let counter = 0;

    // find selected element
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        return pics[i].getAttribute("id")!;
      }
    }

    return "";
  }

  isSolved(): boolean {
    const pics = this.riddle.getElementsByTagName("img");

    //check if the parts are sorted
    for (let i = 0; i < pics.length; i++) {
      const pic = "part" + (i + 1).toString();
      const element = pics[i].getAttribute("id");

      if (pic != element) {
        return false;
      }
    }

    this.solved = true;
    return true;
  }

  shufflePuzzleParts(): number[] {
    const puzzleParts = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    let counter = puzzleParts.length;
    while (counter > 0) {
      const index = Math.floor(Math.random() * counter);
      counter--;
      const temp = puzzleParts[counter];
      puzzleParts[counter] = puzzleParts[index];
      puzzleParts[index] = temp;
    }
    return puzzleParts;
  }

  areNeighbours(firstPicId: string, secondPicId: string): boolean {
    const pics = this.riddle.getElementsByTagName("img");

    for (let i = 0; i < pics.length; i++) {
      if (pics[i].getAttribute("id") == firstPicId) {
        const neighbourIdxs = this.getNeighbourIdxs(i);
        for (let j = 0; j < neighbourIdxs.length; j++) {
          if (pics[neighbourIdxs[j]].getAttribute("id") == secondPicId) {
            return true;
          }
        }
      }
    }
    return false;
  }

  swapParts(): void {
    const pics = this.riddle.getElementsByTagName("img");
    let pic1 = null;

    // loop through parts
    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        if (pic1 == null) {
          pic1 = document.getElementById(pics[i].getAttribute("id")!);
          continue;
        }

        let pic2 = document.getElementById(pics[i].getAttribute("id")!)!;

        //swap pictures (swap their properties)
        const pic1Source = pic1.getAttribute("src")!;
        const pic1Alt = pic1.getAttribute("alt")!;
        const pic1Id = pic1.getAttribute("id")!;

        const pic2Source = pic2.getAttribute("src")!;
        const pic2Alt = pic2.getAttribute("alt")!;
        const pic2Id = pic2.getAttribute("id")!;

        pic1.setAttribute("src", pic2Source);
        pic1.setAttribute("alt", pic2Alt);
        pic1.setAttribute("id", pic2Id);

        pic2.setAttribute("src", pic1Source);
        pic2.setAttribute("alt", pic1Alt);
        pic2.setAttribute("id", pic1Id);

        if (this.isSolved()) {
          let solved = document.createElement("div");
          solved.id = "solved";

          const linkText = document.createTextNode("SOLVED :)");
          solved.appendChild(linkText);
          this.riddle.appendChild(solved);
        }

        break;
      }
    }
  }

  resetOpacity(): void {
    const pics = this.riddle.getElementsByTagName("img");

    for (let i = 0; i < pics.length; i++) {
      if (pics[i].style.opacity == "0.6") {
        pics[i].style.opacity = "1.0";
      }
    }
  }

  getNeighbourIdxs(currentIdx: number): number[] {
    const returnIdxs: number[] = [];

    // upperNeighbourIdx
    if (this.isNeighbourIndexCol(currentIdx - 3)) {
      returnIdxs.push(currentIdx - 3);
    }
    // rightNeighbourIdx
    if (this.isNeighbourIndexRow(currentIdx, currentIdx + 1)) {
      returnIdxs.push(currentIdx + 1);
    }
    // lowerNeighbourIdx
    if (this.isNeighbourIndexCol(currentIdx + 3)) {
      returnIdxs.push(currentIdx + 3);
    }
    // leftNeighbourIdx
    if (this.isNeighbourIndexRow(currentIdx, currentIdx - 1)) {
      returnIdxs.push(currentIdx - 1);
    }

    return returnIdxs;
  }

  isNeighbourIndexRow(currentIdx: number, checkIdx: number): boolean {
    return (Math.max(-1, checkIdx) > -1) &&
      (Math.min(9, checkIdx) < 9) &&
      (Math.floor(currentIdx / 3) == Math.floor(checkIdx / 3));
  }

  isNeighbourIndexCol(checkIdx: number): boolean {
    return (Math.max(-1, checkIdx) > -1) &&
      (Math.min(9, checkIdx) < 9);
  }
}
