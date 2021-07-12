import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from '../products.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { GlobalService } from 'app/shared/services/global-service.service';
import { amazonUrl } from 'app/shared/services/global';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy{
  closeResult = ''
  code:string
  locals:any[]=[]
  selectedbrands:any[]=[]
  brands:any = []
  selectedCat:any[]=[]
  categories:any[]=[]  
  brandIds:any
  catIds:any
  labelForm:FormGroup
  id;amazonImgUrl:string = amazonUrl;
  private sub: any;
  search2; search3;
  constructor(private route: ActivatedRoute, private modalService:NgbModal, 
    private fb : FormBuilder, private productSerivce:ProductsService, private gs:GlobalService) {
    this.labelForm = this.fb.group({
      label:['', Validators.required]
    }) 
  }
  productDetail:any = {}
  protuctTitle
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => { 
      this.id = params.id;
   });
   this.getProduct();
   this.getBrands();
   this.getCat();
    this.gs.getLocals().subscribe((res:any)=>{
      if(res.code == 200){
        this.locals = res.data.data
      }
    })
  }
  getProduct(){
    this.productSerivce.getProductById(this.id).subscribe((res:any)=>{
      if(res.code == 200){
        this.productDetail = res.data
      }
     }, error=>{
     })
  }
  getBrands(){
    this.productSerivce.allBrandsForOthers().then((res:any)=>{
      this.brands = res.brands
    })
  }
  getCat(){
    this.productSerivce.allCatForOther().then((res:any)=>{
      this.categories = res.categories
    })
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
  localId
  singleLocal:any[]
  changeLocal(event){
    this.singleLocal = event.target.value.split('/')
    this.code = this.singleLocal[0]
    this.localId = this.singleLocal[1]
  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', backdrop:'static', keyboard:false})
  }
  openModel(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', windowClass: 'my-class', backdrop:'static', keyboard:false})
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
  submitLabel(form:FormGroup){
    this.productSerivce.submitLabel(form.value.label, this.productDetail._id, this.localId)
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
  addCategory(){
    this.catIds = []
    for(let i=0; i<this.selectedCat.length; i++){
      this.catIds.push(this.selectedCat[i]._id)
    }
    this.productSerivce.addCatToProduct(this.id,this.catIds).subscribe((res:any)=>{
      if(res.code == 200){
        this.modalService.dismissAll()
        Swal.fire({
          icon:'success',
          title:'Category added successfully',
          width:'400px',
          timer:2500,
          showConfirmButton:false
        })
        this.productDetail = res.data
      }
    },error=>{
      this.modalService.dismissAll()
      Swal.fire({
        icon:'error',
        title:error.error.singleStringMessage,
        width:'400px',
        timer:2500,
        showConfirmButton:false
      })
    })
  }
  addBrand(){
    this.brandIds = []
    for(let i=0; i<this.selectedbrands.length; i++){
      this.brandIds.push(this.selectedbrands[i]._id)
    }
    this.productSerivce.addBrandToProduct(this.id, this.brandIds).subscribe((res:any)=>{
      if(res.code == 200){
        this.productDetail = res.data
        this.modalService.dismissAll()
        Swal.fire({
          icon:'success',
          title:'Brand added successfully',
          width:'400px',
          timer:2500,
          showConfirmButton:false
        })
      }
    },error=>{
      this.modalService.dismissAll()
      Swal.fire({
        icon:'error',
        title:error.error.singleStringMessage,
        width:'400px',
        timer:2500,
        showConfirmButton:false
      })
    })
  }
  removeBrandById(brandId){
    this.productSerivce.removeBrandToProduct(this.id, brandId).subscribe((res:any)=>{
      if(res.code == 200){
        this.productDetail = res.data
        this.getProduct()
      }
    })
  }
  removeCatById(catId){
    this.productSerivce.removeCatById(this.id,catId).subscribe((res:any)=>{
      if(res.code == 200){
        this.productDetail = res.data
        this.getProduct()
      }
    })
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }
}