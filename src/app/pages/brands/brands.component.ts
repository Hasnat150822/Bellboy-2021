import { Component, OnInit } from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BrandsService } from './brands.service';
import { PagerService } from 'app/shared/services/pager.service';
import { Router } from '@angular/router';
import { GlobalService } from 'app/shared/services/global-service.service';
import { sweetAlert } from 'app/shared/services/global';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
}) 
export class BrandsComponent implements OnInit {
  addBrandForm:FormGroup
  submitted:boolean
  closeResult = '';
  allBrands:any[] = []
  pager: any = {};
  totalitems
  search:string
  constructor(private pagerService: PagerService, private modalService: NgbModal, 
    private fb:FormBuilder, private brandService:BrandsService, private globalService:GlobalService,
    private router:Router) {
    this.addBrandForm = this.fb.group({
      brandTitle:['', Validators.required]
    })
   }
  searchPagination:boolean
  public message: string;
  ngOnInit() {
    this.getBrands(1)
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
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
  searchBrands(keyword, page){
    this.spinner = true
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.keyword = keyword
    this.brandService.searchBrands(keyword, page).subscribe((res:any)=>{
      if(res.code == 200){
        this.searchPagination = true
        this.default = false
        this.spinner = false
        this.totalitems = res.data.count
        this.allBrands = res.data.brands
        this.pager = this.pagerService.getPager(res.data.count, page, 10);
      }
    },error=>{
      this.spinner = false
    })
  }
  default:boolean
  getBrands(page){
    this.spinner = true
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.brandService.getBrand(page).subscribe((res:any)=>{
      if(res.code == 200){
        this.default = true
        this.searchPagination = false
        this.totalitems = res.data.count
        this.spinner = false
        this.allBrands = res.data.brands
        this.pager = this.pagerService.getPager(res.data.count, page, 10);
        
      }
    }, error=>{this.spinner = false;})
  }
  currentImage
  bigImage(content, imgLink){
    this.currentImage  =  'https://api.bellboy.co/'+imgLink
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  brandSubmit(form:FormGroup){
    this.submitted = true
    if(form.valid==true && this.imageFile!==undefined ){
      this.brandService.createBrand(form.value.brandTitle, this.imageFile).subscribe((res:any)=>{
        if(res.code == 200){
          this.getBrands(1)
          this.imageFile = undefined
          this.imgURL = undefined
          this.submitted = false
          sweetAlert('warning', 'Brand Added successfully')
        }
      },(error:any)=>{
        this.imageFile = undefined
        this.imgURL = undefined
        sweetAlert('error', error)
      })
      this.submitted = false
      form.reset()
      this.modalService.dismissAll()
    }
  }
  brandDetail(id){
    this.router.navigate(['/brands/branddetail', id])
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