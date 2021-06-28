import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user-management/user.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { RoleManagementService } from '../role-management/role-management.service';
import { GlobalService } from 'app/shared/services/global-service.service';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import { amazonUrl } from 'app/shared/services/global';
import { Subscription } from 'rxjs';
interface DETAIL_USER {
  name:string,
  contact_number:string,
  email:string,
  password:string,
  role:{
    title:string
  },
  avatar:{
    value:string
  }
}
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  updateProfile:FormGroup
  allRoles:any;
  eyeToggle:boolean = false;
  eyeToggle2:boolean = false;
  _id:number;
  detailUser:DETAIL_USER = {
    name:"null",
    contact_number:"null",
    email:"null",
    password:"null",
    role:{
      title:"null"
    },
    avatar:{
      value:"null"
    }
  };
  submitted:boolean = false
  amazonImgUrl:string = amazonUrl;
  subscription:Subscription;
  constructor(private route:ActivatedRoute, private userService:UserService, private formbuilder:FormBuilder,
    private roleService:RoleManagementService, private globalService:GlobalService, private store:Store<USER_NAME>, private ref:ChangeDetectorRef) {
    this.updateProfile = this.formbuilder.group({
      name:[''],
      cellNo:[''],
      email:[''],
      pass:[''],
      confirmpass:[''],
      selectRole:['']
    })
    this.getUser();
   }
  ngOnInit() {
    this.route.params.subscribe((res:any)=>{
      this._id = res.id
    })
    this.roleService.getRole().subscribe((res:any)=>{
      this.allRoles = res.data.Roles;
    })
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.ref.detectChanges();
  }
  getUser(){
    this.store.subscribe((res:any)=>{
      res = res.UserData.data;
      if(res!==undefined){
        this.detailUser = res;
        this.updateProfile.controls.name.setValue(this.detailUser.name);
        this.updateProfile.controls.email.setValue(this.detailUser.email);
        this.updateProfile.controls.cellNo.setValue(this.detailUser.contact_number);
        if(res.avatar.value){
          this.imgURL = res.avatar.value;
        }
        if(this.detailUser.role.title!=='Super Admin'){
          this.updateProfile.controls.selectRole.disable();
          this.updateProfile.controls.email.disable();
        }
      }
    }, err=>{}, ()=>{this.subscription.unsubscribe()})
  }
  imgURL
  imageFile:File
  message
 async preview(files){
   this.imageFile = files[0]
    if(files.length===0){
      return false
    }else if(files[0].type.match(/image\/*/) == null){
      this.message = "Only images are supported.";
      return
    }else{
      await base64(files).then((data)=>{
        this.imgURL = data
      })
      this.globalService.compress(this.imgURL, files[0].name).then((res:any)=>{
        let result = res[0]
        if(result.status == true){
          this.imageFile = result.file
          this.imgURL = result.con64
          return
        }
      })
    }
  }
  updateUser(form:FormGroup){
    let obj = form.getRawValue()
    if(this.imageFile !==undefined){
      obj['image'] = this.imageFile;
    }
    this.submitted = true
    this.userService.updateUser(obj, this._id, '').subscribe(()=>{
      this.getUser()
    })
  }
}
function base64(files){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = ()=>resolve(reader.result)
    reader.onerror = error=>reject(error)
 })
}