import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from './user.service';
import { RoleManagementService } from '../role-management/role-management.service' 
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { amazonUrl, dynamicSort, sweetAlert } from 'app/shared/services/global';
import { GlobalService } from 'app/shared/services/global-service.service';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import * as allActions from '../../ngrx-states/actions';
String.prototype.toLocaleUpperCase = function(){
  return this.replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}
declare const $:any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserManageComponent implements OnInit{
  closeResult = '';
  addUserForm:FormGroup
  roles:any = []
  search
  spinner:boolean
  message:string
  blockedUsers:any = []
  placeVal:string = "Name";
  amazonUrl = amazonUrl;
  loggedInUser = {};
  susbscription:Subscription;
  isBigImg:boolean;
  constructor(private modalService: NgbModal, private fb:FormBuilder, private globalService:GlobalService,
    private userService:UserService, private roleService:RoleManagementService, private translate:TranslateService,
    private store:Store<USER_NAME>, private router:Router)
  {
    this.addUserForm = this.fb.group({
      name:['', Validators.required],
      email:['', Validators.compose([
        Validators.required,
        Validators.email
      ])],
      cellno:['', Validators.compose([
        Validators.required
      ])],
      pass:['', Validators.required],
      role:['', Validators.required]
    })
  }
  ngOnInit(){
    this.roleService.getRole().subscribe((res:any)=>{
      if(res.code == 200){
        this.roles = res.data.Roles
      }
    })
    this.getUsers('', true, 'id');
    this.getBlockUser();
    this.translate.addLangs(['ur']);
    this.translate.use('ur');
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
  }
  getBlockUser(){
    this.userService.getBlockeduser().subscribe((res:any)=>{
      this.blockedUsers = res.data.admins
    })
  }
  currentImage
  bigImage(url){
    this.isBigImg=true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  myPorfile(){
    this.susbscription = this.store.subscribe((res:any)=>{
      res = res.UserData.data;
      if(res!==undefined){
        this.loggedInUser['id'] = res._id;
        this.loggedInUser['role'] = res.role.title;
      }
    })
  }
  allUsers:Array<any> = [];
  getUsers(keyword, status, type){
    this.spinner = true;
    keyword = keyword.toLocaleUpperCase();
    this.userService.getUsers(keyword, status, type).subscribe((res:any)=>{
      if(res.code == 200 ){
        this.allUsers = res.data.admins
        this.spinner = false
      }else{this.spinner = false}
    },error=>{
      this.spinner = false
    })
  }
  crossClick(form:FormGroup){
    form.reset()
    this.modalService.dismissAll()
  }
  submitted:boolean
  submitUser(form:FormGroup){
    this.submitted = true
    let obj = form.getRawValue();
    if(this.imageFile!==undefined){
      obj['image'] = this.imageFile;
    }
    if(form.valid){
      this.userService.addUser(obj).subscribe((res:any)=>{
        if(res.code == 200){
          this.getUsers('', true, 'Id')
          form.reset()
          this.modalService.dismissAll()
        }
      })
    }
  }
  
  imgURL
  imageFile:File
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
  changeStatus(id, status){
    Swal.fire({
      icon:'question',
      text:'Are You Sure!',
      width:'300px',
      showConfirmButton:true,
      showCancelButton:true
    }).then((result:any)=>{
      if(result.value == true){
        this.userService.updateUser('',id, status).subscribe((res:any)=>{
          this.getUsers('', true, 'Id');
          this.getBlockUser();
        })
      }else{
        return false;
      }
    })
  }
  toggleSort(){
    toggle(
      () => {
        this.allUsers.sort(dynamicSort("name"))
        $('#sortIcon').addClass('ft-chevron-up');
        $('#sortIcon').removeClass('ft-chevron-down');
      },
      () => {
        this.allUsers.reverse();
        $('#sortIcon').addClass('ft-chevron-down');
        $('#sortIcon').removeClass('ft-chevron-up');
      }
    );
  }
  userDetail(id, title){
    if(this.loggedInUser['role']!=="Super Admin" && title=="Super Admin"){
      sweetAlert('warning', 'Not Authorized to perform this action.');
    }else{
      this.router.navigate(['/usermanage/userdetail', id]);
    }
  }
}
var togg = true;
function toggle(a, b) {
  togg=!togg;
  return (togg == false? a() : b());
}
function base64(files){
  return new Promise((resolve, reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(files[0])
    reader.onload = ()=>resolve(reader.result)
    reader.onerror = error=>reject(error)
 })
}