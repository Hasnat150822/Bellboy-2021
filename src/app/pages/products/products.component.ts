import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from './products.service';
import Swal from 'sweetalert2';
import { PagerService } from 'app/shared/services/pager.service';
import { Router } from '@angular/router';
import { BrandsService } from '../brands/brands.service';
import { CategoriesService } from '../categories/categories.service';
import { amazonUrl } from 'app/shared/services/global';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  closeResult = '';
  search2
  search3
  page=1
  searchPro
  spinner:boolean
  title; brand; Category; addedBy
  BigsearchForm:FormGroup
  brands : any[] = []
  categories:any[] = []
  selectedbrands:any[] = []
  selectedCat:any[]= []
  brandIds:any[] = []
  catIds:any[] = []
  allProducts:any[] = []
  submitted:boolean
  productForm:FormGroup
  keyword
  searchPagination:boolean
  default:boolean
  totalitems:any
  pager: any = {}; amazonImgUrl:string = amazonUrl;
  constructor(public router:Router, public pagerService:PagerService,public modalService: NgbModal, public productService:ProductsService, public fb:FormBuilder) {
    this.productForm = this.fb.group({
      title:['', Validators.required]
    })
   }
  ngOnInit() {
    this.getProduct(1)
    this.getBrands()
    this.getCat()
  }
  getBrands(){
    this.productService.allBrandsForOthers().then((res:any)=>{
      this.brands = res.brands
    })
  }
  getCat(){
    this.productService.allCatForOther().then((res:any)=>{
      this.categories = res.categories
    })
  }
  searchProduct(keyword, page){
    this.keyword = keyword
    if(keyword.length==0){
      this.getProduct(1);
    }else{
      this.productService.searchProducts(keyword, page).subscribe((res:any)=>{
        this.allProducts = res.data.products
        this.searchPagination = true
        this.default = false
        this.totalitems = res.data.count
        this.pager = this.pagerService.getPager(res.data.count, page);
      })
    }
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
  }
  searchResult:any = []
  searchBrand(keyword){
    if(keyword.length==0){
      this.searchResult = []
    }else{
      keyword = keyword.toLowerCase()
      this.searchResult = this.brands.filter(f=> f.title.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  getProduct(page){
    this.spinner = true
    if(page>this.pager.totalPages){
      page = this.pager.totalPages
    }else if(page<0){
      page = 1
    }
    this.productService.getProducts(page).subscribe((res:any)=>{
      if(res.code == 200){
        this.spinner = false
        this.default = true
        this.searchPagination = false
        this.totalitems = res.data.count
        this.allProducts = res.data.products
        this.pager = this.pagerService.getPager(res.data.count, page, 10);
      }else{
        this.spinner = false
      }
    }, error=>{
      this.spinner = false
    })
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  open2(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'my-class'})
  }
  sIndex
  selectionBrand(i){
    this.sIndex = this.brands.indexOf(this.searchResult[i])
    this.selectedbrands.push(this.searchResult[i])
    this.brands.splice(this.sIndex,1)
    this.searchResult.splice(i,1)
  }
  removeSelectionBrand(i){
    this.brands.splice(this.sIndex, 0, this.selectedbrands[i])
    this.searchResult.splice(i, 0, this.selectedbrands[i])
    this.selectedbrands.splice(i, 1)
  }
  searchResultCat
  searchCat(keyword){
    if(keyword.length==0){
      this.searchResultCat = []
    }else{
      keyword = keyword.toLowerCase()
      this.searchResultCat = this.categories.filter(f=> f.title.toLowerCase().indexOf(keyword) !==-1)
    }
  }
  cIndex
  selectionCat(i){
    this.cIndex = this.categories.indexOf(this.searchResultCat[i])
    this.selectedCat.push(this.searchResultCat[i])
    this.categories.splice(this.cIndex,1)
    this.searchResultCat.splice(i,1)
  }
  removeSelectionCat(i){
    this.categories.splice(this.cIndex, 0, this.selectedCat[i])
    this.searchResultCat.splice(i, 0, this.selectedCat[i])
    this.selectedCat.splice(i, 1)
  }
  submitProduct(form:FormGroup){
    this.brandIds = []
    this.catIds = []
    this.submitted = true
    if(form.valid && this.selectedCat.length!=0 && this.selectedbrands.length!=0){
      for(let i=0; i<this.selectedbrands.length; i++){
        this.brandIds.push(this.selectedbrands[i]._id)
      }
      for(let i=0; i<this.selectedCat.length; i++){
        this.catIds.push(this.selectedCat[i]._id)
      }
      this.productService.addProduct(form.value.title, this.brandIds, this.catIds).subscribe((res:any)=>{
        form.reset()
        this.submitted = false
        this.search2 = ''
        this.search3 = ''
        if(res.code == 200){
          this.getProduct(1)
          this.getCat()
          this.getBrands()
          this.modalService.dismissAll()
          this.selectedCat = []
          this.selectedbrands = []
             this.brandIds = []
             this.catIds = []
          Swal.fire({
            icon:'success',
            title:'Product Successfully Added',
            width:'400px',
            timer:2500,
            showConfirmButton:false
          })
        }
      }, (error:any)=>{
        form.reset()
        this.modalService.dismissAll()
          this.brandIds = []
          this.catIds = []
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
  ProductDetail(id){
    this.router.navigate(['/products/productdetail', id]);
  }
}
