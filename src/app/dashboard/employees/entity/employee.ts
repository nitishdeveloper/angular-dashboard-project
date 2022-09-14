import { Address } from './address';
import { Department } from './department';
export class Employee {
    id: number;
    firstname: string;
    lastname: string;
    emailId: string;
    phoneNumber: string;
    department: Department;
    addresses: Array<Address>
    constructor(id: number, firstname: string, lastname: string, emailId: string, phoneNumber: string, department: Department, addresses: Array<Address>) {
        this.id = id;
        this.firstname = firstname;
        this.lastname = lastname;
        this.emailId = emailId;
        this.phoneNumber = phoneNumber;
        this.department = department;
        this.addresses = addresses
    }

}
