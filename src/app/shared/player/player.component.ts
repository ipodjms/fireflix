import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @Input() source: String;

  @ViewChild('pRef', null) pRef: ElementRef;

  constructor() { }

  ngOnInit() {
    this.pRef.nativeElement.play();
  }

}
