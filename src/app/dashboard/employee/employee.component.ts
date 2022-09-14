import { Constants } from './../constants';
import { Component, Input, OnInit } from '@angular/core';
import { DashboardService } from './../dashboard.service';
import { Validators, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {
  @Input() 
  public action : any;
  
  public employees: any
  public employee : FormGroup;
  public employeeForm: FormGroup
  public addressMessage : string
  public isClickedAddress : boolean;
  public isEditable : boolean = false;
  public submitted : boolean = false;
  

  constructor(private formBuilder: FormBuilder, private modalService: NgbModal,public activeModal: NgbActiveModal,private dashboardService: DashboardService) {
    this.employeeForm = this.employeeFormInitialize();
    this.addressMessage = "Present Address"
    this.isClickedAddress = false;
    this.employee = this.employeeFormInitialize();
  }

  ngOnInit(): void {
    this.addNewAddress()
    this.getEmployeeById(this.action['employeeId']);
    this.performActionOfViewAndEdit()
  }


  employeeFormInitialize(): FormGroup {
    return this.formBuilder.group({
      id: [null],
      firstname: ['',Validators.compose([Validators.required])],
      lastname: ['',Validators.compose([Validators.required])],
      emailId: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
      phoneNumber: ['', Validators.compose([Validators.required,Validators.pattern("^[0-9]*$"),Validators.minLength(10), Validators.maxLength(10)])],
      departmentName: ['',Validators.required],
      designation: ['',Validators.required],
      addresses: this.formBuilder.array([])
    })
  }

  phoneNumberValidateOnKeyPress(event: any) {
    const pattern = /[0-9\+\-\ ]/;
    let inputChar = String.fromCharCode(event.charCode);
    if (event.keyCode != 8 && !pattern.test(inputChar)) {
       event.preventDefault();
    }
  }


  allowAlphabetsOnly(key: any) {
    var keycode = (key.which) ? key.which : key.keyCode;
    return (keycode > 64 && keycode < 91) || (keycode > 96 && keycode < 123) ? true : false;
    
         
}

  get addresses(): FormArray {
    return this.employeeForm.controls["addresses"] as FormArray
  }

  addNewAddress(): void {
    const newAddress = this.formBuilder.group({
      addressline1: ['',Validators.required],
      state: ['',Validators.required],
      city: ['',Validators.required],
      pincode: ['',Validators.required]
    })
    this.addresses.push(newAddress)
  }

  validateAddress(index:number) {
    let addresses = this.employeeForm.get('addresses') as FormArray;
    const addressesFormGroup = this.addresses.controls[index] as FormGroup;
    return addressesFormGroup;
  }


  addNewAddressOnClick():void{
    this.isClickedAddress = true;
    this.addNewAddress()
  }




  removeAddress(i:number) {
    if(i==1){
       this.addresses.removeAt(i);
       this.isClickedAddress = false;
    }
  }

  getAllEmployees(): void {
    this.dashboardService.getAllEmployees().subscribe(response => {
      this.employees = response
    })
  }

  getEmployeeById(employeeId:any):void{
    this.dashboardService.getEmployeeById(employeeId).subscribe(response=>{
      this.setEmployeeDataForViewAndUpdate(response)
    })
  }

  setEmployeeDataForViewAndUpdate(employee:any) : void {  
    this.employeeForm.controls['id'].setValue(employee.id)
    this.employeeForm.controls['firstname'].setValue(employee.firstname)
    this.employeeForm.controls['lastname'].setValue(employee.lastname)
    this.employeeForm.controls['emailId'].setValue(employee.emailId)
    this.employeeForm.controls['phoneNumber'].setValue(employee.phoneNumber)
    this.employeeForm.controls['departmentName'].setValue(employee.department.departmentName)
    this.employeeForm.controls['designation'].setValue(employee.department.designation)
    this.employeeForm.controls['addresses'].setValue(employee.addresses)
  }

  saveAndUpdateOnClick() : void {
    this.submitted = true;
    
    if (this.employeeForm.invalid) {
      return;
    }

    const employee = this.employeeForm.value
    const department = {
      departmentName: employee['departmentName'],
      designation: employee['designation']
    }
    employee['department'] = department;
    console.log("save and update request : ",employee)
    if(employee['id'] == null || employee['id'] == ''){
      console.log("create")
     this.dashboardService.saveEmployee(employee).subscribe(response => {})
    }else{
      console.log("update")
      this.dashboardService.updateEmployee(this.action['employeeId'],employee).subscribe(response => {})
    }
    this.employeeForm.reset()
    this.getAllEmployees()
    this.activeModal.close()
    this.submitted = false;
    Constants.doRefresh()
  }

  

  performActionOfViewAndEdit():void{
    this.isEditable = this.action['actionType'] == 'view' ? true : false
  }

}
