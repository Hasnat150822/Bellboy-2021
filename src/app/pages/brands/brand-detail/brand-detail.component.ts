import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { BrandsService } from '../brands.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GlobalService } from 'app/shared/services/global-service.service';
import { Subscription } from 'rxjs';
import { sweetAlert } from 'app/shared/services/global';
declare const $:any
@Component({
  selector: 'app-brand-detail',
  templateUrl: './brand-detail.component.html',
  styleUrls: ['./brand-detail.component.scss']
})
export class BrandDetailComponent implements OnInit {
  closeResult = '';
  sub:any
  id:any
  subsciption: Subscription;
  brandDetail:any=[]
  locals:any[]=[]
  code:string 
  labelForm:FormGroup
  constructor(private modalService: NgbModal, private route:ActivatedRoute,  
    private globalService:GlobalService,
    private brandService:BrandsService , private fb:FormBuilder, private gs:GlobalService) { 
      this.labelForm = this.fb.group({
        label:['']
      })
     }
  locale
  engLabel
  urdLabel
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.getBrandDetail()
   });
   this.gs.getLocals().subscribe((res:any)=>{
     this.locals = res.data.data
   })
  }
  getBrandDetail(){
    this.brandService.getBrandById(this.id).subscribe((res:any)=>{
      if(res.code == 200){
        this.brandDetail = res.data
        this.engLabel = this.brandDetail.labels[0]
        this.urdLabel = this.brandDetail.labels[1]
        this.imgURL = 'https://api.bellboy.co/'+this.brandDetail.icon
        if(res.data.labels[1] == undefined){
          this.locale = ''
        }else{
          this.locale = this.brandDetail.labels[1].label
        }
      }
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
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
  }  
  submitLabel(form:FormGroup){
    this.brandService.addLabelToBrand(form.value.label, this.brandDetail._id, this.localId)
    .subscribe((res:any)=>{
      if(res.code == 200){
        this.getBrandDetail()
        this.modalService.dismissAll()
        sweetAlert('success','Label Added Successfully')
      }else{
        sweetAlert('warning',res.message)
      }
    },error=>{
        sweetAlert('error',error.error.message)
    })
  }
  changeStatus(status){
    this.subsciption = this.brandService.updateBrand('', this.brandDetail._id,'',status,'')
    .subscribe((res:any)=>{
     if(res.success == true){
        this.brandDetail = res.data.Brand
      }else{
        sweetAlert('warning',res.message)
      }
    }, error=>{
      sweetAlert('error',error.error.message)
    })
  }
  updateImage(){
    this.brandService.updateBrand('',this.id, '','' ,this.imageFile )
    .subscribe((res:any)=>{
      if(res.success == true){
        this.brandDetail = res.data.Brand
        sweetAlert('success','Updated')
      }else{
        sweetAlert('warning',res.message)
      }
    }, error=>{
      sweetAlert('error',error.error.message)
    })
  }
  updateLabel(fieldId, item){
    let value = $('#'+fieldId).val();
    if(item.label == value){
      return false
    }else{
      this.brandService.updateBrand(value, this.id, fieldId, '', '').subscribe((res:any)=>{
        if(res.success == true){
          this.brandDetail = res.data.Brand
          sweetAlert('success','Updated')
        }else{
          sweetAlert('warning',res.message)
        }
      }, error=>{
        sweetAlert('error',error.error.message)
      })
    }
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