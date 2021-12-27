import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { RoleManagementService } from 'app/pages/role-management/role-management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { amazonUrl } from 'app/shared/services/global';
import { Store } from '@ngrx/store';
import { USER_NAME } from 'app/ngrx-states/model/url.model';
import { Subscription } from 'rxjs';
import * as allActions from '../../../ngrx-states/actions';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  closeResult = '';
  _id
  detailUser
  allRoles:any[]
  inputType = "password";
  eyeToggle:boolean = true;
  updateUser:FormGroup;
  amazonImgUrl:string = amazonUrl;
  susbscription:Subscription;
  loggedInUser = {};
  isBigImg:boolean;
  constructor(private route:ActivatedRoute,
    private userservice:UserService, private roleService:RoleManagementService,
    private fb:FormBuilder, private store:Store<USER_NAME>) {
      this.updateUser = this.fb.group({
        'name':[''],
        'email':[''],
        'pass':[''],
        'roleId':[''],
        'cellNo':['']
      })
     }
  ngOnInit() {
    this.myPorfile();
    this.route.params.subscribe((res:any)=>{
      this._id = res.id
    })
    this.getSingleUser()
    this.susbscription = this.roleService.getRole().subscribe((res:any)=>{
      this.allRoles = res.data.Roles
    }, err=>{}, ()=>{this.susbscription.unsubscribe()})
  }
  getSingleUser(){
    this.susbscription = this.userservice.getById(this._id).subscribe((res:any)=>{
      this.detailUser = res.data;
      if(this.detailUser._id!==this.loggedInUser['id'] && this.detailUser.role.title=='Super Admin'){  
        this.updateUser.disable();
      }else if(this.loggedInUser['role']!=='Super Admin'){
        this.updateUser.controls.roleId.disable();
        this.updateUser.controls.pass.disable();
        this.updateUser.controls.email.disable();
      }
    }, err=>{}, ()=>{this.susbscription.unsubscribe()})
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
  bigImage(url){
    this.isBigImg=true;
    this.store.dispatch(new allActions.SendUrl(url));
  }
  update(form:FormGroup){
    let obj = form.getRawValue()
    if(obj.name=='' && obj.email=='' && obj.cellNo=='' && obj.roleId=='' && obj.pass==''){
      return false
    }else{
      this.susbscription = this.userservice.updateUser(obj, this._id, '').subscribe((res:any)=>{
        this.getSingleUser()
      })
    }
  } 
}
