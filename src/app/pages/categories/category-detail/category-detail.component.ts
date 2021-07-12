import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../categories.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'app/shared/services/global-service.service';
import Swal from 'sweetalert2';
import { NgxImageCompressService } from 'ngx-image-compress';
import { Subscription } from 'rxjs';
interface Window {
  webkitURL?: any;
  URL?:any;
}
declare const window:Window
declare const $:any
@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss']
})
export class CategoryDetailComponent implements OnInit {
  closeResult = '';
  id:any;
  catDetail:any=[];
  locals:any[] = [];
  labelForm:FormGroup;
  code:string;
  subsciption:Subscription;
  constructor(private modalService: NgbModal, private router:Router, 
    private route:ActivatedRoute, private categoryService:CategoriesService, 
    private fb :FormBuilder, private gs:GlobalService, private imageCompressor:NgxImageCompressService) { 
      this.labelForm = this.fb.group({
        label:['', Validators.required]
      })
    }
    locale
  ngOnInit() {
    this.route.params.subscribe((params)=>{
      this.id = params.id
      this.categoryService.getCatById(this.id).subscribe((res:any)=>{
        if(res.code==200){
          this.catDetail = res.data
          this.imgURL = 'https://api.bellboy.co/'+this.catDetail.icon
          this.locale = this.catDetail.labels[1].label
        }
      })
    })
    this.gs.getLocals().subscribe((res:any)=>{
      this.locals = res.data.data
    })
  }
  localId
  singleLocal:any[]
  changeLocal(event){
    this.singleLocal = event.target.value.split('/')
    this.code = this.singleLocal[0]
    this.localId = this.singleLocal[1]
  }
  imgURL: any;
  public message: string;
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
      this.gs.compress(this.imgURL, files[0].name).then((res:any)=>{
        let result = res[0]
        if(result.status == true){
          this.imageFile = result.file
          this.imgURL = result.con64
          return
        }
      })
    }
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
  }  
  submitLabel(form:FormGroup){
    this.categoryService.addLabelToCat(form.value.label, this.catDetail._id, this.localId)
    .subscribe((res:any)=>{
      if(res.code == 200){
        this.modalService.dismissAll()
        Swal.fire({
          icon:'success',
          title:'Label successfully added.',
          width:'400px',
          timer:2500,
          showConfirmButton:false
        })
      }else if(res.code == 500){
        Swal.fire({
          icon:'error',
          title:res.message,
          width:'400px',
          timer:2500,
          showConfirmButton:false
        })
      }
    })
  }
  changeStatus(status){
    this.subsciption = this.categoryService.updateCat('', this.catDetail._id,'',status,'')
    .subscribe((res:any)=>{
     if(res.success == true){
        this.catDetail = res.data.category
      }else{
        this.showError(res.message)
      }
    }, error=>{
      this.showError(error.error.message)
    })
  }
  updateLabel(fieldId, item){
    let value = $('#'+fieldId).val();
    if(item.label == value){
      return false
    }else{
      this.categoryService.updateCat(value, this.id, fieldId, '', '').subscribe((res:any)=>{
        if(res.success == true){
          this.catDetail = res.data.category
          this.showSuccess('Updated')
        }else{
          this.showError(res.message)
        }
      }, error=>{
        this.showError(error.error.message)
      })
    }
  }
  updateImage(){
    this.categoryService.updateCat('',this.id, '','' ,this.imageFile )
    .subscribe((res:any)=>{
      if(res.success == true){
        this.catDetail = res.data.category
        this.showSuccess('Updated')
      }else{
        this.showError(res.message)
      }
    }, error=>{
      this.showError(error.error.message)
    })
  }
  showError(message){
    Swal.fire({
      icon:'error',
      text:message,
      width:'300px',
      showConfirmButton:false,
      showCancelButton:false,
      timer:2500
    })
  }
  showSuccess(message){
    Swal.fire({
      icon:'success',
      text:message,
      width:'300px',
      timer:2500,
      showConfirmButton:false
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