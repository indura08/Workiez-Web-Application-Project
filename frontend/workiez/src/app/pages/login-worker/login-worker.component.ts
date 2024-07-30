import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { WorkerService } from '../../services/worker.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Province } from '../../../models/Enums/ProvinceEnum';
import { District } from '../../../models/Enums/DistrictEnum';
import { Gender } from '../../../models/Enums/GenderEnum';
import { ReactiveFormsModule } from '@angular/forms';
import { error } from 'console';
import { HttpErrorResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Service } from '../../../models/service';
import { ServiceName } from '../../../models/Enums/ServicenameEnum';
import { Router } from '@angular/router';
import { Role } from '../../../models/Enums/RoleEnum';
import { Worker } from '../../../models/worker';

@Component({
  selector: 'app-login-worker',
  standalone: true,
  imports: [HeaderComponent, FormsModule, CommonModule, ReactiveFormsModule],
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

  workerCreationForm = new FormGroup({
    firstname: new FormControl("", [Validators.required]),
    lastname: new FormControl("", [Validators.required]),
    username: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(7)]),
    baseDistrict: new FormControl("", [Validators.required]),
    baseProvince: new FormControl("", [Validators.required]),
    baseCity: new FormControl("", [Validators.required]),
    gender: new FormControl("", [Validators.required]),
    phone: new FormControl("", [Validators.required]),
    availability: new FormControl(true, []),
    experienceDescription: new FormControl("" , [Validators.required]),
    role: new FormControl(Role.ROLE_WORKER, [])
  })

  public handleGenderValue(value:any){
    if(value == 1){
      this.workerCreationForm.patchValue({gender: Gender.MALE})
    }
    else if(value==2){
      this.workerCreationForm.patchValue({gender: Gender.FEMALE})
    }
  }

  
  public handleDistrictValue(value:any){
    if(value==1){
      this.workerCreationForm.patchValue({baseDistrict: District.AMPARA});
    }
    else if(value==2){
      this.workerCreationForm.patchValue({baseDistrict: District.ANURADHAPURA});
    }
    else if(value==3){
      this.workerCreationForm.patchValue({baseDistrict: District.BADULAA});
    }
    else if(value==4){
      this.workerCreationForm.patchValue({baseDistrict: District.BATTICALOA});
    }
    else if(value==5){
      this.workerCreationForm.patchValue({baseDistrict: District.COLOMBO});
    }
    else if(value==6){
      this.workerCreationForm.patchValue({baseDistrict: District.GALLE});
    }
    else if(value==7){
      this.workerCreationForm.patchValue({baseDistrict: District.GAMPAHA});
    }
    else if(value==8){
      this.workerCreationForm.patchValue({baseDistrict: District.HAMBANTHOTA});
    }
    else if(value==9){
      this.workerCreationForm.patchValue({baseDistrict: District.JAFFNA});
    }
    else if(value==10){
      this.workerCreationForm.patchValue({baseDistrict: District.KALUTHARA});
    }
    else if(value==11){
      this.workerCreationForm.patchValue({baseDistrict: District.KANDY});
    }
    else if(value==12){
      this.workerCreationForm.patchValue({baseDistrict: District.KEGALLE});
    }
    else if(value==13){
      this.workerCreationForm.patchValue({baseDistrict: District.KILINOCHCHI});
    }
    else if(value==14){
      this.workerCreationForm.patchValue({baseDistrict: District.KURUNEGALA});
    }
    else if(value==15){
      this.workerCreationForm.patchValue({baseDistrict: District.MANNER});
    }
    else if(value==16){
      this.workerCreationForm.patchValue({baseDistrict: District.MATALE});
    }
    else if(value==17){
      this.workerCreationForm.patchValue({baseDistrict: District.MATARA});
    }
    else if(value==18){
      this.workerCreationForm.patchValue({baseDistrict: District.MONARAGALA});
    }
    else if(value==19){
      this.workerCreationForm.patchValue({baseDistrict: District.MULLAITIVU});
    }
    else if(value==20){
      this.workerCreationForm.patchValue({baseDistrict: District.NUWARA_ELIYA});
    }
    else if(value==21){
      this.workerCreationForm.patchValue({baseDistrict: District.POLLANNARUWA});
    }
    else if(value==22){
      this.workerCreationForm.patchValue({baseDistrict: District.PUTTALAM});
    }
    else if(value==23){
      this.workerCreationForm.patchValue({baseDistrict: District.RATHNAPURA});
    }
    else if(value==24){
      this.workerCreationForm.patchValue({baseDistrict: District.TRINCOMALEE});
    }
    else if(value==25){
      this.workerCreationForm.patchValue({baseDistrict: District.VAVUNIYA});
    }
  }

  public handleProvinceValue(value:any){
    if(value==1){
      this.workerCreationForm.patchValue({baseProvince: Province.CENTRAL})
    }
    else if(value==2){
      this.workerCreationForm.patchValue({baseProvince: Province.EASTERN})
    }
    else if(value==3){
      this.workerCreationForm.patchValue({baseProvince: Province.NORTH_CENTRAL})
    }
    else if(value==4){
      this.workerCreationForm.patchValue({baseProvince: Province.NORTHERN})
    }
    else if(value==5){
      this.workerCreationForm.patchValue({baseProvince: Province.NORTH_WESTERN})
    }
    else if(value==6){
      this.workerCreationForm.patchValue({baseProvince: Province.SABARAGAMUWA})
    }
    else if(value==7){
      this.workerCreationForm.patchValue({baseProvince: Province.SOUTHERN})
    }
    else if(value==8){
      this.workerCreationForm.patchValue({baseProvince: Province.UVA})
    }
    else if(value==9){
      this.workerCreationForm.patchValue({baseProvince: Province.WESTERN})
    }
  } 

  public addWorker(){
    if(this.workerCreationForm.valid){
      const newWorker: Worker = {
        workerId: 0,
        firstname: this.workerCreationForm.value.firstname as string,
        lastname: this.workerCreationForm.value.lastname as string,
        username: this.workerCreationForm.value.username as string,
        email:this.workerCreationForm.value.email as string,
        password: this.workerCreationForm.value.password as string,
        baseDistrict: this.workerCreationForm.value.baseDistrict as District,
        baseProvince: this.workerCreationForm.value.baseProvince as Province,
        baseCity: this.workerCreationForm.value.baseCity as string,
        gender: this.workerCreationForm.value.gender as Gender,
        phone: this.workerCreationForm.value.phone as string,
        services: this.services,
        availability: this.workerCreationForm.value.availability as boolean,
        experienceDescription: this.workerCreationForm.value.experienceDescription as string,
        role: this.workerCreationForm.value.role as Role,
      }

      this.workerService.addWorker(newWorker).subscribe(
        (response:string) => {
          console.log(response);  //this was added to debugging purposes
          console.log(newWorker);
          this.router.navigate(['/worker/login'])
        },
        (error:HttpErrorResponse) => {
          alert(error.message)
          console.log(newWorker)  //this was added to debugginh purposes
        }
      )
    }
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

    else if(event.target.checked && event.target.value === "electrician" && !this.services.some(service => service.serviceId == 3)){
      const electricianService: Service = {serviceId:3, serviceName:ServiceName.ELECTRICIAN , description:"" , priceRange:"", workers:[] }
      this.services.push(electricianService);
    }
    else if(event.target.checked && event.target.value === "plumber" && !this.services.some(service => service.serviceId == 4)){
      const plumberService: Service = {serviceId:4, serviceName:ServiceName.PLUMBER , description:"" , priceRange:"", workers:[] }
      this.services.push(plumberService);
    }
    else if(event.target.checked && event.target.value === "hvac" && !this.services.some(service => service.serviceId == 5)){
      const hvacService: Service = {serviceId:5, serviceName:ServiceName.HVAC , description:"" , priceRange:"", workers:[] }
      this.services.push(hvacService);
    }
    else if(event.target.checked && event.target.value === "computer" && !this.services.some(service => service.serviceId == 6)){
      const computerService: Service = {serviceId:6, serviceName:ServiceName.COMPUTER_REPAIR , description:"" , priceRange:"", workers:[] }
      this.services.push(computerService);
    }
    else if(event.target.checked && event.target.value === "furniture" && !this.services.some(service => service.serviceId == 7)){
      const furnitureService: Service = {serviceId:7, serviceName:ServiceName.FURNITURE_REPAIR , description:"" , priceRange:"", workers:[] }
      this.services.push(furnitureService);
    }
    else if(event.target.checked && event.target.value === "tilesetting" && !this.services.some(service => service.serviceId == 8)){
      const tilesettingService: Service = {serviceId:8, serviceName:ServiceName.TILE_SETTING , description:"" , priceRange:"", workers:[]}
      this.services.push(tilesettingService);
    }
    else if(event.target.checked && event.target.value === "plastering" && !this.services.some(service => service.serviceId == 9)){
      const plasterService: Service = {serviceId:9, serviceName:ServiceName.PLASTERING , description:"" , priceRange:"", workers:[] }
      this.services.push(plasterService);
    }
    else if(event.target.checked && event.target.value === "cleaning" && !this.services.some(service => service.serviceId == 10)){
      const cleaningService: Service = {serviceId:10, serviceName:ServiceName.CLEANING , description:"" , priceRange:"", workers:[] }
      this.services.push(cleaningService);
    }
    else if(event.target.checked && event.target.value === "transport" && !this.services.some(service => service.serviceId == 11)){
      const transportService: Service = {serviceId:11, serviceName:ServiceName.TRANSPORT , description:"" , priceRange:"", workers:[] }
      this.services.push(transportService);
    }
    else if(event.target.checked && event.target.value === "painting" && !this.services.some(service => service.serviceId == 12)){
      const paintingService: Service = {serviceId:12, serviceName:ServiceName.PAINTING , description:"" , priceRange:"", workers:[] }
      this.services.push(paintingService);
    }
    else if(event.target.checked && event.target.value === "waste" && !this.services.some(service => service.serviceId == 13)){
      const wasteService: Service = {serviceId:13, serviceName:ServiceName.WASTE_AND_ENVIRONMENTAL_SERVICES , description:"" , priceRange:"", workers:[] }
      this.services.push(wasteService);
    }
    else if(event.target.checked && event.target.value === "pest" && !this.services.some(service => service.serviceId == 14)){
      const pestcontrolService: Service = {serviceId:14, serviceName:ServiceName.PEST_CONTROL , description:"" , priceRange:"", workers:[] }
      this.services.push(pestcontrolService);
    }
    else if(event.target.checked && event.target.value === "carpenter" && !this.services.some(service => service.serviceId == 15)){
      const carpenterService: Service = {serviceId:15, serviceName:ServiceName.CARPENTERS , description:"" , priceRange:"", workers:[] }
      this.services.push(carpenterService);
    }

  }


//add worker before
// public addWorker(addForm:NgForm){
//   this.workerService.addWorker(addForm.value).subscribe(
//     (response:string)=>{
//       console.log(response)
//       this.router.navigate(['/worker/login'])
//       addForm.resetForm();
//       console.log(this.services);  //this was added for debugging purposes
//     },
//     (error: HttpErrorResponse) =>{
//       alert(error.message)
//       console.log(addForm.value); //this was added for debugging purposes
//       console.log(this.services); //this was added for debugging purposes
//     } 

//   )
// }
}