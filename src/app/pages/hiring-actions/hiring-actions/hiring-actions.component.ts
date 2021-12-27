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
  hiringActions:any;
  assignLabel:FormGroup;
  locals:any = []
  currentImage
  code:string
  actionTypeId;
  selectedCategory:string;
  amazonImgUrl:string = amazonUrl;
  constructor(private fb:FormBuilder, private modalService:NgbModal,
    private hirngActService:HiringActionsService, private globalService:GlobalService) { 
    this.addHiringAction = this.fb.group({
      title:['', Validators.required],
      hasLocation:[''],
      desc:['', Validators.required],
      category:['', Validators.required]
    })
    this.assignLabel = this.fb.group({
      label:['', Validators.required]
    })
  }
  ngOnInit() {
    this.getMainAction('');
    this.getActions('');
    this.globalService.getLocals().subscribe((res:any)=>{
      if(res.code == 200){
        this.locals = res.data.data
      }
    })
  }
  mainAction = [];
  mainActionId;
  getMainAction(status){
    this.mainAction = [];
    this.hirngActService.getMainhiring(status).subscribe((res:any)=>{
      this.mainAction = res.data.HiringActionTypes;
    })
  }
  subActions = [];
  status='';
  getSubActions(status){
    this.status = status;
    this.hirngActService.getSubActions(this.mainActionId,status).subscribe((res:any)=>{
      this.subActions = res.data.HiringActionTypes;
    })
  }
  openContext;
  open(content){
    this.modalService.open(content,{ariaLabelledBy: 'modal-basic-title',backdrop:'static', keyboard : false });
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
  changeAction(){
    if(this.addHiringAction.valid && this.imgURL !==undefined ){
      let obj = this.addHiringAction.getRawValue()
      let observable;
      if(this.openContext == 'create'){
        observable = this.hirngActService.addHiringActions(obj, this.imageFile, 'create');
      }else if(this.openContext == 'update'){
        obj.category = this.actionTypeId;
        observable = this.hirngActService.addHiringActions(obj, this.imageFile, 'update');
      }else{
        obj.category = this.actionTypeId;
        observable = this.hirngActService.addHiringActions(obj, this.imageFile, 'updateMain');
      }
      observable.subscribe((res:any)=>{
        if(res.success==true){
          this.modalService.dismissAll();
          this.getSubActions('')
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
  updateAction(context, item, openContext){
    this.openContext = openContext;
    this.addHiringAction.controls.title.setValue(item.title);
    this.addHiringAction.controls.desc.setValue(item.description);
    if(openContext=='updateMain'){
      this.addHiringAction.controls.category.setValue(item._id);
    }
    this.actionTypeId = item._id;
    this.imgURL = this.amazonImgUrl+item.icon;
    this.open(context);
  }
  getActions(status){
    this.hiringActions = [];
    this.hirngActService.getHiringActions(status).subscribe((res:any)=>{
      this.hiringActions = res.data.HiringActionTypes
    })
  }
  // submitLabel(form:FormGroup){
  //   if(form.valid){
  //     let value = form.getRawValue();
  //     this.hirngActService.assignLabel(this.actionTypeId, value.label, this.localId)
  //     .subscribe((res:any)=>{
  //       if(res.code == 200){
  //         this.getActions('');
  //       }
  //     })
  //   }
  // }
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