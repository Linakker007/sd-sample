import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-sdlt-one',
  templateUrl: './sdlt-one.component.html',
  styleUrls: ['./sdlt-one.component.scss']
})
export class SdltOneComponent implements OnInit {
  section: any;
  myForm = new FormGroup({
    property: new FormControl('', Validators.required),
    transaction: new FormControl('', [
      Validators.required]),
    interesttransfer: new FormControl('', [
      Validators.required]),
    completedate: new FormControl('', [
      Validators.required]),
    anyrestriction: new FormControl('', [
      Validators.required]),
    detailsrestriction: new FormControl('', [
      Validators.required]),
    datecontract: new FormControl('', [
      Validators.required]),
    partexchanged: new FormControl('', [
      Validators.required]),
    postcode: new FormControl('', [
      Validators.required]),
    buildingNumber: new FormControl('', [
      Validators.required]),
    buildingName: new FormControl('', [
      Validators.required]),
    streetName: new FormControl('', [
      Validators.required]),
    town: new FormControl('', [
      Validators.required]),
    county: new FormControl('', [
      Validators.required]),
    transactionPursant: new FormControl('', [
      Validators.required]),
    numberofproperties: new FormControl('', [
      Validators.required]),
    eachproperty: new FormControl('', [
      Validators.required]),


 });
  

  constructor() { }

  ngOnInit(): void {

  }


  setActiveSection(val: any, event: any) {
    this.section = val;
    const sections = document.getElementsByClassName('tabbed-content-block-menu-item');

    for (var i = 0; i < sections.length; i++) {
      sections[i].classList.remove("active");
    }
    event.target.parentElement.classList.add("active")

  }

  SectionChosen(val:any){
    this.section = val;
  }


}
