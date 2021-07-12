import { Component, OnInit } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { RoleManagementService } from './role-management.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { checkValues } from './role.modal';
import { sort } from 'app/shared/services/global';
declare const $:any;
@Component({
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.scss']
})
export class RoleManagementComponent implements OnInit {
  closeResult = '';
  permissions:any[] = []
  createRoleForm:FormGroup
  updateForm:FormGroup
  roleSubmitted:boolean
  roleTitle
  _id
  singlePermissions:any[] = [];
  checkboxValue = checkValues;
  checkedValues :any[]=[];
  isHideBellboy:boolean = true;
  isHideFinance:boolean = true;
  isHideOrder:boolean = true;
  isHideAction:boolean = true;
  isHideMedia:boolean = true;
  isHideReports:boolean = true;
  isHideCharges:boolean = true;
  constructor(private formBuilder:FormBuilder, private modalService: NgbModal, private roleService:RoleManagementService) { 
    this.createRoleForm = this.formBuilder.group({
      title:['', Validators.required]
    })
    this.updateForm = this.formBuilder.group({
      title:['', Validators.required]
    })
  }
  ngOnInit() { 
    this.getRole();
  }
  changeCheck(event, i, addInt){
    i = i+addInt
    if(event.target.checked == false){
      let index = this.checkedValues.indexOf(event.target.value);
      this.checkedValues.splice(index, 1)
      this.checkboxValue[i].selected = false
    }else{
      this.checkboxValue[i].selected = true
      this.checkedValues.splice(i,0,event.target.value)
    }
  }
  spinner:boolean
  getRole(){
    this.spinner = true
    this.roleService.getRole().subscribe((res:any)=>{
      this.permissions = res.data.Roles
      this.spinner = false
    }, error=>{
      this.spinner = false
    })
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass:'roleClass', backdrop:'static', keyboard:false})
  }
  permissionVerify(item, permissions){
    this.roleTitle = item.title
    this._id = item._id
    this.singlePermissions = permissions
    for (let i = 0; i < this.checkboxValue.length; i++) {
      for (let j = 0; j < permissions.length; j++) {
        if (this.checkboxValue[i].value == permissions[j]) {
          this.checkboxValue[i].selected = true
          break
        }else{
          this.checkboxValue[i].selected = false
        }
      }
      
    }
  }
  SubmitRole(form:FormGroup){
    this.roleSubmitted = true;
    let values =  form.getRawValue();
    if(form.valid && this.checkedValues.length!=0){
      this.roleService.createRole(values.title, this.checkedValues).subscribe((res:any)=>{
        if(res.code == 200){
          form.reset();
          this.isHideBellboy = true
          this.isHideFinance = true
          this.isHideOrder = true
          this.isHideMedia = true
          this.isHideAction = true
          this.getRole()
          Swal.fire({
            icon:'success',
            title:'Role Added Successfully',
            width:'400px',
            timer:2500,
            showConfirmButton:false
          })
          this.checkedValues = []
          this.roleSubmitted = false
          this.modalService.dismissAll()
        }
      },error=>{
        Swal.fire({
          icon:'error',
          title:error.error.message,
          width:'400px',
          timer:2500,
          showConfirmButton:false
        })
      })
    }
  }
  UpdateRole(form:FormGroup){
    // form.value.title
    if(form.value.title!='')
      this.roleTitle = form.value.title
    this.checkedValues = []
    for (let i = 0; i < this.checkboxValue.length; i++) { 
      if(this.checkboxValue[i].selected == true){
        this.checkedValues.push(this.checkboxValue[i].value)
      }
    }
    this.roleService.updateRole(this._id, this.roleTitle, this.checkedValues)
    .subscribe((res:any)=>{
      this.getRole()
    })
  }
  sortByName(){
    togg2 = false;
    togg=!togg;
    if(togg == true){
      sort('title', this.permissions);
      $('#sortByName').addClass('ft-chevron-up');
      $('#sortByName').removeClass('ft-chevron-down');
    }else{
      this.permissions.reverse();
      $('#sortByName').addClass('ft-chevron-down');
      $('#sortByName').removeClass('ft-chevron-up');
    }
  }
  sortByNumber(){
    togg=!togg;
    if(togg == true){
      sort('title', this.permissions);
      $('#sortByName').addClass('ft-chevron-up');
      $('#sortByName').removeClass('ft-chevron-down');
    }else{
      this.permissions.reverse();
      $('#sortByName').addClass('ft-chevron-down');
      $('#sortByName').removeClass('ft-chevron-up');
    }
  }
}
var togg = false;
var togg2 = false;