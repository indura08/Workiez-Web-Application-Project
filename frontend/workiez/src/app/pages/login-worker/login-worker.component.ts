import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { WorkerService } from '../../services/worker.service';
import { NgForm } from '@angular/forms';
import { Province } from '../../../models/Enums/ProvinceEnum';
import { District } from '../../../models/Enums/DistrictEnum';
import { Gender } from '../../../models/Enums/GenderEnum';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Service } from '../../../models/service';
import { ServiceName } from '../../../models/Enums/ServicenameEnum';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-worker',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule],
  templateUrl: './login-worker.component.html',
  styleUrl: './login-worker.component.css'
})
export class LoginWorkerComponent implements OnInit {
  ngOnInit(): void {}
  constructor(private workerService : WorkerService, private router:Router){}

  province:Province = Province.WESTERN;
  district: District = District.COLOMBO;
  gender: Gender = Gender.MALE;
  services: Service[] = [];
  checked:boolean = false;


  public handleGenderValue(value:any){
    if(value == 1){
      this.gender = Gender.MALE;
    }
    else if(value==2){
      this.gender = Gender.FEMALE;
    }
  }

  
  public handleDistrictValue(value:any){
    if(value==1){
      this.district = District.AMPARA
    }
    else if(value==2){
      this.district = District.ANURADHAPURA
    }
    else if(value==3){
      this.district = District.BADULAA
    }
    else if(value==4){
      this.district = District.BATTICALOA
    }
    else if(value==5){
      this.district = District.COLOMBO
    }
    else if(value==6){
      this.district = District.GALLE
    }
    else if(value==7){
      this.district = District.GAMPAHA
    }
    else if(value==8){
      this.district = District.HAMBANTHOTA
    }
    else if(value==9){
      this.district = District.JAFFNA
    }
    else if(value==10){
      this.district = District.KALUTHARA
    }
    else if(value==11){
      this.district = District.KANDY
    }
    else if(value==12){
      this.district = District.KEGALLE
    }
    else if(value==13){
      this.district = District.KILINOCHCHI
    }
    else if(value==14){
      this.district = District.KURUNEGALA
    }
    else if(value==15){
      this.district = District.MANNER
    }
    else if(value==16){
      this.district = District.MATALE
    }
    else if(value==17){
      this.district = District.MATARA
    }
    else if(value==18){
      this.district = District.MONARAGALA
    }
    else if(value==19){
      this.district = District.MULLAITIVU
    }
    else if(value==20){
      this.district = District.NUWARA_ELIYA
    }
    else if(value==21){
      this.district = District.POLLANNARUWA
    }
    else if(value==22){
      this.district = District.PUTTALAM
    }
    else if(value==23){
      this.district = District.RATHNAPURA
    }
    else if(value==24){
      this.district = District.TRINCOMALEE
    }
    else if(value==25){
      this.district = District.VAVUNIYA
    }
  }

  public handleProvinceValue(value:any){
    if(value==1){
      this.province = Province.CENTRAL
    }
    else if(value==2){
      this.province = Province.EASTERN
    }
    else if(value==3){
      this.province = Province.NORTH_CENTRAL
    }
    else if(value==4){
      this.province = Province.NORTHERN
    }
    else if(value==5){
      this.province = Province.NORTH_WESTERN
    }
    else if(value==6){
      this.province = Province.SABARAGAMUWA
    }
    else if(value==7){
      this.province = Province.SOUTHERN
    }
    else if(value==8){
      this.province = Province.UVA
    }
    else if(value==9){
      this.province = Province.WESTERN
    }
  } 

  public addWorker(addForm:NgForm){
    this.workerService.addWorker(addForm.value).subscribe(
      (response:string)=>{
        console.log(response)
        this.router.navigate(['/profile/worker'])
        addForm.resetForm();
        console.log(this.services);  //this was added for debugging purposes
      },
      (error: HttpErrorResponse) =>{
        alert(error.message)
        console.log(addForm.value); //this was added for debugging purposes
        console.log(this.services); //this was added for debugging purposes
      } 

    )
  }

  public handlecheckbox(event:any){
    if(event.target.checked && event.target.value === "mason" && !this.services.some(service => service.serviceId == 1)){
      const masonService: Service = {serviceId:1, serviceName:ServiceName.MASON , description:"" , priceRange:"", workers:[] }
      this.services.push(masonService);
    }

    else if(event.target.checked && event.target.value === "roofer" && !this.services.some(service => service.serviceId == 2)){
      const rooferService: Service = {serviceId:2, serviceName:ServiceName.ROOFER , description:"" , priceRange:"", workers:[] }
      this.services.push(rooferService);
    }

    else if(event.target.checked && event.target.value === "electrician" && !this.services.some(service => service.serviceId == 4)){
      const electricianService: Service = {serviceId:4, serviceName:ServiceName.ELECTRICIAN , description:"" , priceRange:"", workers:[] }
      this.services.push(electricianService);
    }
    else if(event.target.checked && event.target.value === "plumber" && !this.services.some(service => service.serviceId == 5)){
      const plumberService: Service = {serviceId:5, serviceName:ServiceName.PLUMBER , description:"" , priceRange:"", workers:[] }
      this.services.push(plumberService);
    }
    else if(event.target.checked && event.target.value === "hvac" && !this.services.some(service => service.serviceId == 6)){
      const hvacService: Service = {serviceId:6, serviceName:ServiceName.HVAC , description:"" , priceRange:"", workers:[] }
      this.services.push(hvacService);
    }
    else if(event.target.checked && event.target.value === "computer" && !this.services.some(service => service.serviceId == 7)){
      const computerService: Service = {serviceId:7, serviceName:ServiceName.COMPUTER_REPAIR , description:"" , priceRange:"", workers:[] }
      this.services.push(computerService);
    }
    else if(event.target.checked && event.target.value === "furniture" && !this.services.some(service => service.serviceId == 8)){
      const furnitureService: Service = {serviceId:8, serviceName:ServiceName.FURNITURE_REPAIR , description:"" , priceRange:"", workers:[] }
      this.services.push(furnitureService);
    }
    else if(event.target.checked && event.target.value === "tilesetting" && !this.services.some(service => service.serviceId == 9)){
      const tilesettingService: Service = {serviceId:9, serviceName:ServiceName.TILE_SETTING , description:"" , priceRange:"", workers:[]}
      this.services.push(tilesettingService);
    }
    else if(event.target.checked && event.target.value === "plastering" && !this.services.some(service => service.serviceId == 10)){
      const plasterService: Service = {serviceId:10, serviceName:ServiceName.PLASTERING , description:"" , priceRange:"", workers:[] }
      this.services.push(plasterService);
    }
    else if(event.target.checked && event.target.value === "cleaning" && !this.services.some(service => service.serviceId == 11)){
      const cleaningService: Service = {serviceId:11, serviceName:ServiceName.CLEANING , description:"" , priceRange:"", workers:[] }
      this.services.push(cleaningService);
    }
    else if(event.target.checked && event.target.value === "transport" && !this.services.some(service => service.serviceId == 12)){
      const transportService: Service = {serviceId:12, serviceName:ServiceName.TRANSPORT , description:"" , priceRange:"", workers:[] }
      this.services.push(transportService);
    }
    else if(event.target.checked && event.target.value === "painting" && !this.services.some(service => service.serviceId == 13)){
      const paintingService: Service = {serviceId:13, serviceName:ServiceName.PAINTING , description:"" , priceRange:"", workers:[] }
      this.services.push(paintingService);
    }
    else if(event.target.checked && event.target.value === "waste" && !this.services.some(service => service.serviceId == 14)){
      const wasteService: Service = {serviceId:14, serviceName:ServiceName.WASTE_AND_ENVIRONMENTAL_SERVICES , description:"" , priceRange:"", workers:[] }
      this.services.push(wasteService);
    }
    else if(event.target.checked && event.target.value === "pest" && !this.services.some(service => service.serviceId == 15)){
      const pestcontrolService: Service = {serviceId:15, serviceName:ServiceName.PEST_CONTROL , description:"" , priceRange:"", workers:[] }
      this.services.push(pestcontrolService);
    }
    else if(event.target.checked && event.target.value === "carpenter" && !this.services.some(service => service.serviceId == 16)){
      const carpenterService: Service = {serviceId:16, serviceName:ServiceName.CARPENTERS , description:"" , priceRange:"", workers:[] }
      this.services.push(carpenterService);
    }

  }



}