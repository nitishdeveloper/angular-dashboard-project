import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavbarToggle = new EventEmitter<boolean>();
  menuStatus : boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  sideNaveToggle():void{
    this.menuStatus = !this.menuStatus
    this.sideNavbarToggle.emit(this.menuStatus)
  }

}
