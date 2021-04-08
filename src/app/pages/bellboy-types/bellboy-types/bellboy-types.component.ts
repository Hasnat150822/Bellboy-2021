import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { BellboyTypesService } from '../bellboy-types.service';
import Swal from 'sweetalert2';
import { amazonUrl } from 'app/shared/services/global';
interface Window {
  webkitURL?: any;
  URL?:any;
}
declare const window:Window;
declare const $:any
@Component({
  selector: 'app-bellboy-types',
  templateUrl: './bellboy-types.component.html',
  styleUrls: ['./bellboy-types.component.scss']
})
export class BellboyTypesComponent implements OnInit {
  // inputId;
  isDisable:boolean = true;
  walker:FormGroup;
  cycler:FormGroup;
  biker:FormGroup;
  car:FormGroup;
  delCharges:any = [];spinner:boolean;
  amazonImgUrl = amazonUrl;
  constructor(private fb:FormBuilder, private bbTypesService:BellboyTypesService, private imageCompressor:NgxImageCompressService) { 
    this.walker = this.fb.group({
      title:[{value:'', disabled:true}, Validators.required],
    })
    this.cycler = this.fb.group({
      title:[{value:'', disabled:true}, Validators.required],
    })
    this.biker = this.fb.group({
      title:[{value:'', disabled:true}, Validators.required],
    })
    this.car = this.fb.group({
      title:[{value:'', disabled:true}, Validators.required]
    })
  }
  bbTypes: any = []
  ngOnInit() {
    this.getBBtypes()
  }
  getBBtypes(){
    this.bbTypesService.getBellboyTypes().subscribe((res:any)=>{
      this.bbTypes = res;
      this.imagesURL()
    })
  }
  imagesURL(){
    if(this.bbTypes.Walker){
      this.imgURL = this.amazonImgUrl+this.bbTypes.Walker.icon
    }else if(this.bbTypes.Cycler){
      this.imgURL1 = this.amazonImgUrl+this.bbTypes.Cycler.icon
    }else if(this.bbTypes.Car){
      this.imgURL3 = this.amazonImgUrl+this.bbTypes.Car.icon
    }else{
      this.imgURL2 = this.amazonImgUrl+this.bbTypes.MotoBiker.icon;
    }
  }
  urltype
  imgURL: any;
  imgURL1:any
  imgURL2:any
  imgURL3:any
  public message: string;
  fileName : any;
  height
  width
  tempImageURL:any
  preview(files, type) {
    this.urltype = type
    // to get height and width for image
    const Img = new Image();
    const URL = window.URL || window.webkitURL;
    Img.src = URL.createObjectURL(files[0])
    Img.onload = (e: any) => {
      const height = e.path[0].height;
      const width = e.path[0].width;
      this.height = height
      this.width = width
      this.checkImage()
  }
    this.fileName = files[0]['name'];
    this.imageFile = files[0]
    if (files.length === 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    var reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => {
      this.tempImageURL = reader.result;
    }
  }
  checkImage(){
    if(this.height >300 || this.width>=300){
      this.imageCompress(this.tempImageURL, this.fileName)
    }else{
      if(this.urltype == 'imgURL'){
        this.imgURL = this.tempImageURL
      }else if(this.urltype == 'imgURL1'){
        this.imgURL1 = this.tempImageURL
      }else if(this.urltype == 'imgURL2'){
        this.imgURL2 = this.tempImageURL
      }else{
        this.imgURL3 = this.tempImageURL
      }
      this.message = null
    }
  }
  imageFile:File
  imageCompress(url, name){
    var orientation = -1
    this.imageCompressor.compressFile(url, orientation, 30, 100).then((result)=>{
      if(this.urltype == 'imgURL'){
        this.imgURL = result
      }else if(this.urltype == 'imgURL1'){
        this.imgURL1 = result
      }else if(this.urltype == 'imgURL2'){
        this.imgURL2 = result
      }else{
        this.imgURL3 = result
      }
    })
  }
  changeDisable(input){
    $('#'+input).prop('disabled', !$('#'+input).prop('disabled'))
  }
  closeToast(id){
    $('#'+id).removeClass("d-flex").addClass("d-none")
  }
  updateWalker(form:FormGroup, API, inputId){
    let re = /api.bellboy.co/g
    let matchRes:[] = this.imgURL.match(re);
    if(this.imgURL == undefined || matchRes!=null){
      this.imageFile = null
    }else{
      let file = dataURLtoFile(this.imgURL, this.fileName)
      this.imageFile = file
    }
    if(form.value.title==API.title){
      var title = ''
    }else{
      title = form.value.title
    }
      this.updateBellBoyType(title, this.imageFile, API._id, 'Walker', inputId)
  }
  updateCycler(form:FormGroup, API, inputId){
    let re = /api.bellboy.co/g
    let matchRes:[] = this.imgURL1.match(re);
    if(this.imgURL1 == undefined || matchRes!=null){
      this.imageFile = null
    }else{
      let file = dataURLtoFile(this.imgURL1, this.fileName)
      this.imageFile = file
    }
    if(form.value.title==API.title){
      var title = ''
    }else{
      title = form.value.title
    }
      this.updateBellBoyType(title, this.imageFile, API._id,'Cycler', inputId)
  }
  updateBiker(form:FormGroup, API, inputId){
    let re = /api.bellboy.co/g
    let matchRes:[] = this.imgURL2.match(re);
    if(this.imgURL2 == undefined || matchRes!=null){
      this.imageFile = null
    }else{
      let file = dataURLtoFile(this.imgURL2, this.fileName)
      this.imageFile = file
    }
    if(form.value.title==API.title){
      var title = ''
    }else{
      title = form.value.title
    }
      this.updateBellBoyType(title, this.imageFile, API._id,'MotoBiker', inputId)
  }
  updateCar(form:FormGroup, API, inputId){
    let re = /api.bellboy.co/g
    let matchRes:[] = this.imgURL3.match(re);
    if(this.imgURL3 == undefined || matchRes!=null){
      this.imageFile = null
    }else{
      let file = dataURLtoFile(this.imgURL3, this.fileName)
      this.imageFile = file
    }
    if(form.value.title==API.title){
      var title = ''
    }else{
      title = form.value.title
    }
      this.updateBellBoyType(title, this.imageFile, API._id,'Car', inputId)
  }
  updateBellBoyType(title, imgFile, id,key, inputId){
    this.spinner = true;
    if(title=='' && imgFile==null){
      return false
    }else{
      this.bbTypesService.updateBBtype(title, imgFile, id).subscribe((res:any)=>{
        if(res.success == true){
          this.spinner = false;
          this.bbTypes[key] = res.data.bellBoyType
          this.imagesURL()
          $('#toaster').addClass("d-flex")
          $('#'+inputId).prop('disabled', true)
          setTimeout(() => {
            $('#toaster').removeClass('d-flex')
          }, 2500);
        }else{
          $('#'+inputId).prop('disabled', true)
          Swal.fire({
            icon:'error',
            title:res.message,
            width:'512px',
            timer:2500,
            showConfirmButton:false
          })       
        }
      }, error=>{
        $('#'+inputId).prop('disabled', true)
        Swal.fire({
          icon:'error',
          title:error.error.message,
          width:'512px',
          timer:2500,
          showConfirmButton:false
        })   
      })
    }
  }
}
function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), 
      n = bstr.length, 
      u8arr = new Uint8Array(n);
  while(n--){
      u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {type:mime});
}