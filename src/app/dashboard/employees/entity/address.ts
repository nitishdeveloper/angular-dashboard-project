export class Address{
    addressline1: string;
    state: string;
    city: string;
    pincode: string;

    constructor(addressline1: string,state: string,city: string,pincode: string){
        this.addressline1 = addressline1;
        this.state = state;
        this.city = city;
        this.pincode = pincode;
    }

}