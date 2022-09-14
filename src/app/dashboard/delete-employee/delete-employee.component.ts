import { Constants } from './../constants';
import { EmployeesComponent } from './../employees/employees.component';
import { DashboardService } from './../dashboard.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Injectable, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.scss']
})
export class DeleteEmployeeComponent implements OnInit {
  @Input() 
  public action : any;

  constructor(public activeModal: NgbActiveModal,private dashboardService : DashboardService, private router : Router,private activatedRoute: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
  }

  ngOnInit() {
  }

  deleteEmployeeOnClick() : void {
    console.log("deletion")
    this.dashboardService.deleteEmployeeById(this.action['employeeId']).subscribe(response=>{})
    this.activeModal.close('close')
    Constants.doRefresh()
  }

  
  
}
