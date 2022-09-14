import { DeleteEmployeeComponent } from './../delete-employee/delete-employee.component';
import { EmployeeComponent } from './../employee/employee.component';
import { DashboardService } from './../dashboard.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  public employees: any

  public action = {
    employeeId : '',
    actionType : ''
  }

  constructor(private modalService: NgbModal,config: NgbModalConfig,private dashboardService: DashboardService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.scrollable = true
  }

  ngOnInit(): void {
    this.getAllEmployees()
  }


  getAllEmployees(): void {
    this.dashboardService.getAllEmployees().subscribe(response => {
      this.employees = response
    })
  }
 

  deleteEmployeeOnClick(employeeId : any) : void {
    this.action['employeeId'] = employeeId
    const modalRef = this.modalService.open(DeleteEmployeeComponent);
    modalRef.componentInstance.action = this.action
  }

  viewEmployeeForm(employeeId : any) : void {
    this.action['employeeId'] = employeeId
    this.action['actionType'] = 'view'
    const modalRef = this.modalService.open(EmployeeComponent);
    modalRef.componentInstance.action = this.action
  }

  createEmployeeForm() : void {
    this.action['actionType'] = 'save'
    const modalRef = this.modalService.open(EmployeeComponent);
    modalRef.componentInstance.action = this.action
  }


  updateEmployeeForm(employeeId : any) : void {
    this.action['employeeId'] = employeeId
    this.action['actionType'] = 'edit'
    const modalRef = this.modalService.open(EmployeeComponent);
    modalRef.componentInstance.action = this.action
  }
 
}
