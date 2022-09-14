import { Component, Input, OnInit } from '@angular/core';
import { ITEM_MENU } from './sidebar.menu';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
@Input() sideNavStatus : boolean = false;
  
  items = ITEM_MENU
  
  constructor() { }

  ngOnInit(): void {
  }


  

}
