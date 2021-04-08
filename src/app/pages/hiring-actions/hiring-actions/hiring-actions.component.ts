import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HiringActionsService } from '../hiring-actions.service';
import { GlobalService } from 'app/shared/services/global-service.service';
import { amazonUrl } from 'app/shared/services/global';

@Component({
  selector: 'app-hiring-actions',
  templateUrl: './hiring-actions.component.html',
  styleUrls: ['./hiring-actions.component.scss']
})
export class HiringActionsComponent implements OnInit {
  addHiringAction:FormGroup;
  hiringActions:any = [];
  assignLabel:FormGroup;
  locals:any = []
  currentImage
  code:string
  actionTypeId; tableContext = 'all';
  spinner:boolean;
  amazonImgUrl:string = amazonUrl;
  constructor(private fb:FormBuilder, private modalService:NgbModal,
    private hirngActService:HiringActionsService, private globalService:GlobalService) { 
    this.addHiringAction = this.fb.group({
      title:['', Validators.required],
      hasLocation:[''],
      desc:['', Validators.required]
    })
    this.assignLabel = this.fb.group({
      label:['', Validators.required]
    })
  }
  ngOnInit() {
    this.getActions('');
    this.globalService.getLocals().subscribe((res:any)=>{
      if(res.code == 200){
        this.locals = res.data.data
      }
    })
  }
  open(content){
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title' });
  }
  localId
  singleLocal:any[]
  changeLocal(event){
    this.singleLocal = event.target.value.split('/')
    this.code = this.singleLocal[0]
    this.localId = this.singleLocal[1]
  }
  bigImage(content, url){
    this.currentImage = this.amazonImgUrl+url;
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title' });
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
  submitted
  addAction(form:FormGroup){
    this.submitted = true;
    if(form.valid && this.imageFile !==undefined ){
      let obj = form.getRawValue()
      this.hirngActService.addHiringActions(obj, this.imageFile).subscribe((res:any)=>{
        if(res.success==true){
          this.modalService.dismissAll();
          this.getActions('')
        }else{
          this.modalService.dismissAll();
        }
      }, error=>{
        this.modalService.dismissAll();
      })
    }else{
      return false
    }
  }
  getActions(status){
    this.spinner = true;
    this.hirngActService.getHiringActions(status).subscribe((res:any)=>{
      this.spinner = false;
      this.hiringActions = res.data.HiringActionTypes
    })
  }
  submitLabel(form:FormGroup){
    this.submitted = true
    if(form.valid){
      let value = form.getRawValue();
      this.hirngActService.assignLabel(this.actionTypeId, value.label, this.localId)
      .subscribe((res:any)=>{
        if(res.code == 200){
          this.getActions('');
        }
      })
    }
  }
  changeActionStatus(status:boolean, id){
    this.hirngActService.changeStatus(status, id).subscribe(()=>{
      this.getActions(!status);
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