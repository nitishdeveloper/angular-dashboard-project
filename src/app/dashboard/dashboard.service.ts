import { Constants } from './constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

constructor(private httpClient : HttpClient) { }

  getAllEmployees(){
    return this.httpClient.get(environment.BASE_URL.JSON_SERVER.concat(Constants.API_ENDPOINT))
  }

  getEmployeeById(employeeId : any) {
    return this.httpClient.get(environment.BASE_URL.JSON_SERVER.concat(Constants.API_ENDPOINT).concat(employeeId))
  }

  saveEmployee(employeePayload : any){
    return this.httpClient.post(environment.BASE_URL.JSON_SERVER.concat(Constants.API_ENDPOINT),employeePayload) 
  }

  updateEmployee(employeeId : any , employeePayload : any){
    return this.httpClient.put(environment.BASE_URL.JSON_SERVER.concat(Constants.API_ENDPOINT).concat(employeeId),employeePayload) 
  }

  deleteEmployeeById(employeeId : any) {
    return this.httpClient.delete(environment.BASE_URL.JSON_SERVER.concat(Constants.API_ENDPOINT).concat(employeeId))
  }

  patchEmployeeById(employeePayload : any) {
    return this.httpClient.patch(environment.BASE_URL.JSON_SERVER.concat(Constants.API_ENDPOINT),employeePayload)
  }
  
}
