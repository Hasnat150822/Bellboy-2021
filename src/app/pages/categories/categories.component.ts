import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriesService } from './categories.service';
import Swal from 'sweetalert2';
import { PagerService } from 'app/shared/services/pager.service';
import { Router } from '@angular/router';
import { GlobalService } from 'app/shared/services/global-service.service';
import { amazonUrl, sweetAlert } from 'app/shared/services/global';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  closeResult = '';
  addCategory:FormGroup;
  submitted:boolean;
  search:string;
  allCat:any[] = [];
  totalitems;
  pager: any = {}; 
  message;
  amazonImgUrl:string = amazonUrl;
  constructor(private pagerService:PagerService , private modalService: NgbModal,
    private fb:FormBuilder,private catService:CategoriesService, private router:Router,
    private globalService:GlobalService) {
    this.addCategory = this.fb.group({
      catTitle:['', Validators.required]
    })
   }
  ngOnInit() {
      this.getCat('', 1)
  }  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  currentImage
  bigImage(content, imgLink){
    this.currentImage  =  'https://api.bellboy.co/'+imgLink
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
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
  keyword
  spinner:boolean
  getCat(keyword, page){
    this.spinner= true
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.keyword = keyword
    this.catService.getCat(keyword, page).subscribe((res:any)=>{
      if(res.code == 200){
        this.totalitems = res.data.count
        this.allCat = res.data.categories
        this.spinner = false
        this.pager = this.pagerService.getPager(res.data.count, 1);
      }
    }, error=>{
      this.spinner = false
    })
  }
  categoryDetail(id){
    this.router.navigate(['/categories/categorydetail', id])
  }
  changeStatus(id, status){
    this.catService.updateCat('', id,'',status, '')
    .subscribe((res:any)=>{
      if(res.success == true){
        sweetAlert('success', 'Updated');
        this.getCat('', 1)
      }else{
        sweetAlert('error',res.message)
      }
    }, error=>{
      sweetAlert('error',error.error.message)
    })
  }
  submitCat(form:FormGroup){
    this.submitted = true
    if(form.valid==true && this.imageFile!==undefined ){
      this.catService.createCat(form.value.catTitle, this.imageFile).subscribe((res:any)=>{
        if(res.code == 200){
          this.getCat('', 1)
          this.imageFile = undefined
          this.imgURL = undefined
          this.submitted = false
          sweetAlert('success', 'Category Added Successfully')
        }else{
          sweetAlert('error',res.message)
        }
      },(error:any)=>{
        this.imageFile = undefined
        this.imgURL = undefined
        sweetAlert('error',error.error.message)
      })
      this.submitted = false
      form.reset()
      this.modalService.dismissAll()
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