(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{U5Jw:function(t,e,i){"use strict";i.r(e),i.d(e,"CategoriesModule",function(){return H});var c,a,n=i("ofXK"),o=i("mrSG"),r=i("3Pt+"),s=i("tk/3"),l=i("tkbi"),b=i("q2CC"),g=i("fXoL");let d=(()=>{class t{constructor(t,e){this.http=t,this.gs=e,this._url=b.f,this.gs.token.subscribe(t=>{let e=t;a={headers:new s.c({Authorization:"bearer "+e})},c={headers:new s.c({"Content-Type":"application/x-www-form-urlencoded",Authorization:"bearer "+e})}})}createCat(t,e){let i=new FormData;return i.append("title",t),i.append("icon",e),this.http.post(this._url+"api/admin/category",i,a)}getCat(t,e){return this.http.get(this._url+"api/admin/category?search="+t+"&pageNo="+e+"&perPage=10",a)}getCatById(t){return this.http.get(this._url+"api/admin/category/"+t+"/en",a)}addLabelToCat(t,e,i){let a=(new s.d).set("category",e).set("label",t).set("locale",i);return this.http.post(this._url+"api/admin/category/assignLabel",a.toString(),c)}updateCat(t,e,i,c,n){let o=new FormData;return o.append("title",t),o.append("category",e),o.append("label_id",i),o.append("status",c),o.append("icon",n),this.http.put(this._url+"api/admin/category",o,a)}}return t.\u0275fac=function(e){return new(e||t)(g.ac(s.a),g.ac(l.a))},t.\u0275prov=g.Jb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})();var p=i("PSD3"),u=i.n(p),m=i("PBnp"),h=i("1kSV"),f=i("tyNb");function S(t,e){1&t&&(g.Tb(0,"div",25),g.Ob(1,"div",26),g.Sb())}function T(t,e){if(1&t&&(g.Tb(0,"td"),g.Ic(1),g.Sb()),2&t){const t=g.fc().$implicit;g.Ab(1),g.Jc(null==t.labels[1]?null:t.labels[1].label)}}function v(t,e){1&t&&(g.Tb(0,"td"),g.Ic(1,"-"),g.Sb())}function y(t,e){if(1&t){const t=g.Ub();g.Tb(0,"div"),g.Tb(1,"span"),g.Ic(2,"Active"),g.Sb(),g.Tb(3,"a",31),g.dc("click",function(){g.zc(t);const e=g.fc().$implicit;return g.fc().changeStatus(e._id,"false")}),g.Ob(4,"i",32),g.Sb(),g.Sb()}}function C(t,e){if(1&t){const t=g.Ub();g.Tb(0,"div"),g.Tb(1,"span"),g.Ic(2,"Deactivate"),g.Sb(),g.Tb(3,"a",31),g.dc("click",function(){g.zc(t);const e=g.fc().$implicit;return g.fc().changeStatus(e._id,"true")}),g.Ob(4,"i",33),g.Sb(),g.Sb()}}function w(t,e){if(1&t){const t=g.Ub();g.Tb(0,"tr"),g.Tb(1,"td"),g.Ic(2),g.Sb(),g.Tb(3,"td"),g.Tb(4,"a"),g.Tb(5,"img",27),g.dc("click",function(){g.zc(t);const i=e.$implicit,c=g.fc(),a=g.wc(47);return c.bigImage(a,i.icon)}),g.Sb(),g.Sb(),g.Sb(),g.Gc(6,T,2,1,"td",28),g.Gc(7,v,2,0,"td",28),g.Tb(8,"td"),g.Ic(9,"Hasnat Hameed"),g.Sb(),g.Tb(10,"td"),g.Gc(11,y,5,0,"div",28),g.Gc(12,C,5,0,"div",28),g.Sb(),g.Tb(13,"td"),g.Tb(14,"a",29),g.dc("click",function(){g.zc(t);const i=e.$implicit;return g.fc().categoryDetail(i._id)}),g.Ob(15,"img",30),g.Sb(),g.Sb(),g.Sb()}if(2&t){const t=e.$implicit,i=g.fc();g.Ab(2),g.Jc(null==t.labels[0]?null:t.labels[0].label),g.Ab(3),g.pc("src","",i.amazonImgUrl,"",t.icon,"",g.Bc),g.Ab(1),g.mc("ngIf",null==t.labels[1]?null:t.labels[1].label),g.Ab(1),g.mc("ngIf",!(null!=t.labels[1]&&t.labels[1].label)),g.Ab(4),g.mc("ngIf",1==t.status),g.Ab(1),g.mc("ngIf",0==t.status)}}const I=function(t){return{active:t}};function x(t,e){if(1&t){const t=g.Ub();g.Tb(0,"li",41),g.Tb(1,"a",42),g.dc("click",function(){g.zc(t);const i=e.$implicit,c=g.fc(2);return c.getCat(c.keyword,i)}),g.Ic(2),g.Sb(),g.Sb()}if(2&t){const t=e.$implicit,i=g.fc(2);g.mc("ngClass",g.rc(2,I,i.pager.currentPage===t)),g.Ab(2),g.Jc(t)}}const k=function(t){return{disabled:t}};function A(t,e){if(1&t){const t=g.Ub();g.Tb(0,"ul",34),g.Tb(1,"li",35),g.Tb(2,"a",36),g.dc("click",function(){g.zc(t);const e=g.fc();return e.getCat(e.keyword,1)}),g.Tb(3,"span"),g.Ic(4,"First"),g.Sb(),g.Sb(),g.Sb(),g.Tb(5,"li",35),g.Tb(6,"a",37),g.dc("click",function(){g.zc(t);const e=g.fc();return e.getCat(e.keyword,e.pager.currentPage-10)}),g.Tb(7,"span"),g.Ic(8,"\xab"),g.Sb(),g.Sb(),g.Sb(),g.Gc(9,x,3,4,"li",38),g.Tb(10,"li",35),g.Tb(11,"a",39),g.dc("click",function(){g.zc(t);const e=g.fc();return e.getCat(e.keyword,e.pager.currentPage+10)}),g.Tb(12,"span"),g.Ic(13,"\xbb"),g.Sb(),g.Sb(),g.Sb(),g.Tb(14,"li",35),g.Tb(15,"a",40),g.dc("click",function(){g.zc(t);const e=g.fc();return e.getCat(e.keyword,e.pager.totalPages)}),g.Tb(16,"span"),g.Ic(17,"Last"),g.Sb(),g.Sb(),g.Sb(),g.Sb()}if(2&t){const t=g.fc();g.Ab(1),g.mc("ngClass",g.rc(5,k,1===t.pager.currentPage)),g.Ab(4),g.mc("ngClass",g.rc(7,k,1===t.pager.currentPage)),g.Ab(4),g.mc("ngForOf",t.pager.pages),g.Ab(1),g.mc("ngClass",g.rc(9,k,t.pager.currentPage===t.pager.totalPages)),g.Ab(4),g.mc("ngClass",g.rc(11,k,t.pager.currentPage===t.pager.totalPages))}}function O(t,e){if(1&t&&(g.Tb(0,"p",60),g.Ic(1),g.Sb()),2&t){const t=g.fc(2);g.Ab(1),g.Jc(t.message)}}function L(t,e){1&t&&(g.Tb(0,"p",61),g.Ic(1," Image is required "),g.Sb())}function P(t,e){1&t&&(g.Tb(0,"p",61),g.Ic(1," Category title is required "),g.Sb())}function U(t,e){if(1&t){const t=g.Ub();g.Tb(0,"div",43),g.Tb(1,"h3",44),g.Ic(2,"Add New Category"),g.Sb(),g.Sb(),g.Tb(3,"div",45),g.Tb(4,"form",46),g.Tb(5,"div",47),g.Tb(6,"div",48),g.Tb(7,"input",49,50),g.dc("change",function(){g.zc(t);const e=g.wc(8);return g.fc().preview(e.files)}),g.Sb(),g.Tb(9,"button",51),g.Ic(10,"Add Image"),g.Sb(),g.Ob(11,"img",52),g.Gc(12,O,2,1,"p",53),g.Gc(13,L,2,0,"p",54),g.Sb(),g.Sb(),g.Tb(14,"div",55),g.Ob(15,"input",56),g.Gc(16,P,2,0,"p",54),g.Sb(),g.Sb(),g.Sb(),g.Tb(17,"div",57),g.Tb(18,"button",58),g.dc("click",function(){return e.$implicit.close("Cross click")}),g.Ic(19,"Cancel"),g.Sb(),g.Tb(20,"button",59),g.dc("click",function(){g.zc(t);const e=g.fc();return e.submitCat(e.addCategory)}),g.Ic(21,"Add Category"),g.Sb(),g.Sb()}if(2&t){const t=g.fc();g.Ab(4),g.mc("formGroup",t.addCategory),g.Ab(7),g.nc("src",t.imgURL,g.Bc),g.Ab(1),g.mc("ngIf",t.message),g.Ab(1),g.mc("ngIf",null==t.imgURL&&t.submitted),g.Ab(3),g.mc("ngIf",t.submitted&&t.addCategory.controls.catTitle.hasError("required"))}}function _(t,e){if(1&t&&(g.Tb(0,"div",62),g.Tb(1,"a",63),g.Tb(2,"span",64),g.dc("click",function(){return e.$implicit.close("Cancel Cick")}),g.Sb(),g.Sb(),g.Sb(),g.Tb(3,"div",65),g.Ob(4,"img",66),g.Sb()),2&t){const t=g.fc();g.Ab(4),g.nc("src",t.currentImage,g.Bc)}}let F=(()=>{class t{constructor(t,e,i,c,a,n){this.pagerService=t,this.modalService=e,this.fb=i,this.catService=c,this.router=a,this.globalService=n,this.closeResult="",this.allCat=[],this.pager={},this.amazonImgUrl=b.a,this.addCategory=this.fb.group({catTitle:["",r.s.required]})}ngOnInit(){this.getCat("",1)}open(t){this.modalService.open(t,{ariaLabelledBy:"modal-basic-title"})}bigImage(t,e){this.currentImage="https://api.bellboy.co/"+e,this.modalService.open(t,{ariaLabelledBy:"modal-basic-title"})}preview(t){return Object(o.a)(this,void 0,void 0,function*(){if(this.imageFile=t[0],0===t.length)return!1;null!=t[0].type.match(/image\/*/)?(yield function(t){return new Promise((e,i)=>{const c=new FileReader;c.readAsDataURL(t[0]),c.onload=()=>e(c.result),c.onerror=t=>i(t)})}(t).then(t=>{this.imgURL=t}),this.globalService.compress(this.imgURL,t[0].name).then(t=>{let e=t[0];if(1==e.status)return this.imageFile=e.file,void(this.imgURL=e.con64)})):this.message="Only images are supported."})}getCat(t,e){this.spinner=!0,e>this.pager.totalPages?e=this.pager.totalPages:e<0&&(e=1),this.keyword=t,this.catService.getCat(t,e).subscribe(t=>{200==t.code&&(this.totalitems=t.data.count,this.allCat=t.data.categories,this.spinner=!1,this.pager=this.pagerService.getPager(t.data.count,1))},t=>{this.spinner=!1})}categoryDetail(t){this.router.navigate(["/categories/categorydetail",t])}changeStatus(t,e){this.catService.updateCat("",t,"",e,"").subscribe(t=>{1==t.success?(u.a.fire({icon:"success",text:"Updated",width:"300px",timer:2500,showCancelButton:!1,showConfirmButton:!1}),this.getCat("",1)):this.showError(t.message)},t=>{this.showError(t.error.message)})}submitCat(t){this.submitted=!0,1==t.valid&&void 0!==this.imageFile&&(this.catService.createCat(t.value.catTitle,this.imageFile).subscribe(t=>{200==t.code?(this.getCat("",1),this.imageFile=void 0,this.imgURL=void 0,this.submitted=!1,u.a.fire({icon:"success",title:"Category Added successfully",width:"400px",timer:2500,showConfirmButton:!1})):this.showError(t.message)},t=>{this.imageFile=void 0,this.imgURL=void 0,this.showError(t.error.message)}),this.submitted=!1,t.reset(),this.modalService.dismissAll())}showError(t){u.a.fire({icon:"error",title:t,width:"400px",timer:2500,showConfirmButton:!1})}}return t.\u0275fac=function(e){return new(e||t)(g.Nb(m.a),g.Nb(h.i),g.Nb(r.b),g.Nb(d),g.Nb(f.c),g.Nb(l.a))},t.\u0275cmp=g.Hb({type:t,selectors:[["app-categories"]],decls:48,vars:5,consts:[["id","tabs"],["class","loading-container",4,"ngIf"],[1,"row","text-left","mb-2","mt-2"],[1,"col-sm-6","mb-1"],[1,"col-sm-6","text-right"],[1,"btn","btn-orange","mb-0",3,"click"],[1,"col-sm-12"],[1,"parent"],[1,"ft-search","child"],["type","text","id","SearchBellboy","name","search","placeholder","Search Category",1,"form-control","placeholder-pad","w-33",3,"ngModel","ngModelChange"],[1,"row","text-left"],[1,"col-md-12","col-lg-12"],[1,"card"],[1,"card-content"],[1,"card-body"],[1,"table","table-responsive-md","table-striped"],[4,"ngFor","ngForOf"],[1,"d-flex","justify-content-end"],[1,"mr-3","d-flex","align-items-center"],[1,"h6","mb-0","font-weight-normal","text-shadow","text-orange"],[1,"text-secondary","ml-2"],[1,"ng2-smart-pagination-nav","ng-star-inserted"],["class","ng2-smart-pagination pagination",4,"ngIf"],["addCat",""],["bigImg",""],[1,"loading-container"],[1,"spinner"],["alt","img",1,"table-img-size",3,"src","click"],[4,"ngIf"],[1,"p-0","text-dark",3,"click"],["src","../../../assets/img/ico/eye.png","alt","",1,"img-eye"],[3,"click"],["placement","top","ngbTooltip","Deactivate Category",1,"text-danger","ft-power"],["placement","top","ngbTooltip","Activate Category",1,"text-success","ft-power"],[1,"ng2-smart-pagination","pagination"],[1,"ng2-smart-page-item","page-item",3,"ngClass"],["aria-label","First",1,"ng2-smart-page-link","page-link",3,"click"],["aria-label","Prev","ngbTooltip","Previous",1,"ng2-smart-page-link","page-link","page-link-prev",3,"click"],["class","ng2-smart-page-item page-item ng-star-inserted",3,"ngClass",4,"ngFor","ngForOf"],["ngbTooltip","Next","aria-label","Next",1,"ng2-smart-page-link","page-link","page-link-next",3,"click"],["aria-label","Last",1,"ng2-smart-page-link","page-link",3,"click"],[1,"ng2-smart-page-item","page-item","ng-star-inserted",3,"ngClass"],[1,"ng2-smart-page-link","page-link","ng-star-inserted",3,"click"],[1,"modal-header","justify-content-center","mb-1"],[1,"card-title","mb-0"],[1,"modal-body","pb-0"],[3,"formGroup"],[1,"form-group","text-center"],[1,"position-relative"],["type","file","accept","image/*","type","file",1,"upload-input",3,"change"],["file",""],[1,"camera-icon","btn","btn-orange"],["id","img1","onerror","src='../../../assets/img/ico/bb-brand.jpg'",1,"upload-image",3,"src"],["class","text-error mb-0",4,"ngIf"],["class","text-error",4,"ngIf"],[1,"form-group"],["type","text","formControlName","catTitle","placeholder","Category Name",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-orange",3,"click"],[1,"text-error","mb-0"],[1,"text-error"],[1,"modal-header","d-flex","justify-content-end","pb-0","mb-2"],[1,"mb-2"],[1,"ft-x","text-error",3,"click"],[1,"modal-body","d-flex","justify-content-center","pt-0"],["onerror","src='../../../../assets/img/gallery/1.jpg'",1,"object-fit",3,"src"]],template:function(t,e){if(1&t){const t=g.Ub();g.Tb(0,"section",0),g.Gc(1,S,2,0,"div",1),g.Tb(2,"div",2),g.Tb(3,"div",3),g.Tb(4,"h3"),g.Ic(5,"Categories"),g.Sb(),g.Sb(),g.Tb(6,"div",4),g.Tb(7,"button",5),g.dc("click",function(){g.zc(t);const i=g.wc(45);return e.open(i)}),g.Ic(8,"Add New Category"),g.Sb(),g.Sb(),g.Tb(9,"div",6),g.Tb(10,"div",7),g.Ob(11,"i",8),g.Tb(12,"input",9),g.dc("ngModelChange",function(t){return e.search=t})("ngModelChange",function(){return e.getCat(e.search,1)}),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Tb(13,"div",10),g.Tb(14,"div",11),g.Tb(15,"div",12),g.Tb(16,"div",13),g.Tb(17,"div",14),g.Tb(18,"table",15),g.Tb(19,"thead"),g.Tb(20,"tr"),g.Tb(21,"th"),g.Ic(22,"Title"),g.Sb(),g.Tb(23,"th"),g.Ic(24,"Image"),g.Sb(),g.Tb(25,"th"),g.Ic(26,"Locale"),g.Sb(),g.Tb(27,"th"),g.Ic(28,"Created By"),g.Sb(),g.Tb(29,"th"),g.Ic(30,"Status"),g.Sb(),g.Tb(31,"th"),g.Ic(32,"View / Update"),g.Sb(),g.Sb(),g.Sb(),g.Tb(33,"tbody"),g.Gc(34,w,16,7,"tr",16),g.Sb(),g.Sb(),g.Tb(35,"div",17),g.Tb(36,"p",18),g.Tb(37,"span",19),g.Ic(38,"Total Items"),g.Sb(),g.Ic(39," : "),g.Tb(40,"span",20),g.Ic(41),g.Sb(),g.Sb(),g.Tb(42,"nav",21),g.Gc(43,A,18,13,"ul",22),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Gc(44,U,22,5,"ng-template",null,23,g.Hc),g.Gc(46,_,5,1,"ng-template",null,24,g.Hc)}2&t&&(g.Ab(1),g.mc("ngIf",e.spinner),g.Ab(11),g.mc("ngModel",e.search),g.Ab(22),g.mc("ngForOf",e.allCat),g.Ab(7),g.Jc(e.totalitems),g.Ab(2),g.mc("ngIf",e.pager.pages&&e.pager.pages.length))},directives:[n.o,r.a,r.k,r.n,n.n,h.p,n.m,r.u,r.l,r.f,r.d],styles:["ul.nav-pills[_ngcontent-%COMP%]{padding-left:1rem}.parent[_ngcontent-%COMP%]{position:relative}.child[_ngcontent-%COMP%]{position:absolute;padding:8px 11px}#SearchBellboy[_ngcontent-%COMP%]::-moz-placeholder{color:#ccc;margin-left:10px}#SearchBellboy[_ngcontent-%COMP%]:-ms-input-placeholder{color:#ccc;margin-left:10px}#SearchBellboy[_ngcontent-%COMP%]::placeholder{color:#ccc;margin-left:10px}.upload-input[_ngcontent-%COMP%]{position:absolute;bottom:0;opacity:0;z-index:1;cursor:pointer}.camera-icon[_ngcontent-%COMP%]{position:absolute;bottom:0;right:66px}.upload-image[_ngcontent-%COMP%]{width:120px;height:120px;-o-object-fit:scale-down;object-fit:scale-down;border-radius:15px}.modal-footer[_ngcontent-%COMP%]{padding-top:0}.compress-image[_ngcontent-%COMP%]{position:absolute;bottom:0;margin-left:30px}.h-300[_ngcontent-%COMP%]{height:300px!important;width:300px!important}.ft-power[_ngcontent-%COMP%]{margin-left:10px;font-weight:700;font-size:15px}"]}),t})();var z=i("X9o6");function D(t,e){1&t&&(g.Tb(0,"span",26),g.Ic(1,"Deactive"),g.Sb())}function G(t,e){1&t&&(g.Tb(0,"span",26),g.Ic(1,"Active"),g.Sb())}function M(t,e){if(1&t){const t=g.Ub();g.Tb(0,"i",27),g.dc("click",function(){return g.zc(t),g.fc().changeStatus("true")}),g.Sb()}}function B(t,e){if(1&t){const t=g.Ub();g.Tb(0,"i",28),g.dc("click",function(){return g.zc(t),g.fc().changeStatus("false")}),g.Sb()}}function N(t,e){if(1&t){const t=g.Ub();g.Tb(0,"div",29),g.Tb(1,"div",30),g.Tb(2,"h5",31),g.Ic(3),g.Sb(),g.Sb(),g.Tb(4,"div",32),g.Tb(5,"div",33),g.Ob(6,"input",34),g.Sb(),g.Sb(),g.Tb(7,"div",35),g.Tb(8,"a"),g.Tb(9,"button",36),g.dc("click",function(){g.zc(t);const i=e.$implicit;return g.fc().updateLabel(i._id,i)}),g.Ic(10,"Update Label"),g.Sb(),g.Sb(),g.Sb(),g.Sb()}if(2&t){const t=e.$implicit;g.Ab(3),g.Jc(null==t||null==t.locale?null:t.locale.title),g.Ab(3),g.nc("id",t._id),g.nc("value",null==t?null:t.label)}}function j(t,e){if(1&t&&(g.Tb(0,"option",49),g.Ic(1),g.Sb()),2&t){const t=e.$implicit;g.pc("value","",t.code,"/",t._id,""),g.Ab(1),g.Kc(" ",t.title," ")}}function R(t,e){1&t&&(g.Tb(0,"div",41),g.Ob(1,"input",50),g.Sb())}function E(t,e){1&t&&(g.Tb(0,"div",41),g.Ob(1,"input",51),g.Sb())}function J(t,e){if(1&t){const t=g.Ub();g.Tb(0,"div",37),g.Tb(1,"h3",38),g.Ic(2,"Add Label"),g.Sb(),g.Sb(),g.Tb(3,"div",39),g.Tb(4,"form",40),g.Tb(5,"div",41),g.Tb(6,"select",42),g.dc("change",function(e){return g.zc(t),g.fc().changeLocal(e)}),g.Tb(7,"option",43),g.Ic(8,"Select Language"),g.Sb(),g.Gc(9,j,2,3,"option",44),g.Sb(),g.Sb(),g.Gc(10,R,2,0,"div",45),g.Gc(11,E,2,0,"div",45),g.Sb(),g.Sb(),g.Tb(12,"div",46),g.Tb(13,"button",47),g.dc("click",function(){return e.$implicit.close("Cross click")}),g.Ic(14,"Cancel"),g.Sb(),g.Tb(15,"button",48),g.dc("click",function(){g.zc(t);const e=g.fc();return e.submitLabel(e.labelForm)}),g.Ic(16,"Add Label"),g.Sb(),g.Sb()}if(2&t){const t=g.fc();g.Ab(4),g.mc("formGroup",t.labelForm),g.Ab(5),g.mc("ngForOf",t.locals),g.Ab(1),g.mc("ngIf","ur"==t.code||"ar"==t.code),g.Ab(1),g.mc("ngIf","en"==t.code)}}const q=[{path:"",component:F},{path:"categorydetail/:id",component:(()=>{class t{constructor(t,e,i,c,a,n,o){this.modalService=t,this.router=e,this.route=i,this.categoryService=c,this.fb=a,this.gs=n,this.imageCompressor=o,this.closeResult="",this.catDetail=[],this.locals=[],this.labelForm=this.fb.group({label:["",r.s.required]})}ngOnInit(){this.route.params.subscribe(t=>{this.id=t.id,this.categoryService.getCatById(this.id).subscribe(t=>{200==t.code&&(this.catDetail=t.data,this.imgURL="https://api.bellboy.co/"+this.catDetail.icon,this.locale=this.catDetail.labels[1].label)})}),this.gs.getLocals().subscribe(t=>{this.locals=t.data.data})}changeLocal(t){this.singleLocal=t.target.value.split("/"),this.code=this.singleLocal[0],this.localId=this.singleLocal[1]}preview(t){return Object(o.a)(this,void 0,void 0,function*(){if(this.imageFile=t[0],0===t.length)return!1;null!=t[0].type.match(/image\/*/)?(yield function(t){return new Promise((e,i)=>{const c=new FileReader;c.readAsDataURL(t[0]),c.onload=()=>e(c.result),c.onerror=t=>i(t)})}(t).then(t=>{this.imgURL=t}),this.gs.compress(this.imgURL,t[0].name).then(t=>{let e=t[0];if(1==e.status)return this.imageFile=e.file,void(this.imgURL=e.con64)})):this.message="Only images are supported."})}open(t){this.modalService.open(t,{ariaLabelledBy:"modal-basic-title"})}submitLabel(t){this.categoryService.addLabelToCat(t.value.label,this.catDetail._id,this.localId).subscribe(t=>{200==t.code?(this.modalService.dismissAll(),u.a.fire({icon:"success",title:"Label successfully added.",width:"400px",timer:2500,showConfirmButton:!1})):500==t.code&&u.a.fire({icon:"error",title:t.message,width:"400px",timer:2500,showConfirmButton:!1})})}changeStatus(t){this.subsciption=this.categoryService.updateCat("",this.catDetail._id,"",t,"").subscribe(t=>{1==t.success?this.catDetail=t.data.category:this.showError(t.message)},t=>{this.showError(t.error.message)})}updateLabel(t,e){let i=$("#"+t).val();if(e.label==i)return!1;this.categoryService.updateCat(i,this.id,t,"","").subscribe(t=>{1==t.success?(this.catDetail=t.data.category,this.showSuccess("Updated")):this.showError(t.message)},t=>{this.showError(t.error.message)})}updateImage(){this.categoryService.updateCat("",this.id,"","",this.imageFile).subscribe(t=>{1==t.success?(this.catDetail=t.data.category,this.showSuccess("Updated")):this.showError(t.message)},t=>{this.showError(t.error.message)})}showError(t){u.a.fire({icon:"error",text:t,width:"300px",showConfirmButton:!1,showCancelButton:!1,timer:2500})}showSuccess(t){u.a.fire({icon:"success",text:t,width:"300px",timer:2500,showConfirmButton:!1})}}return t.\u0275fac=function(e){return new(e||t)(g.Nb(h.i),g.Nb(f.c),g.Nb(f.a),g.Nb(d),g.Nb(r.b),g.Nb(l.a),g.Nb(z.a))},t.\u0275cmp=g.Hb({type:t,selectors:[["app-category-detail"]],decls:43,vars:6,consts:[[1,"row"],[1,"col-sm-12"],[1,"card"],[1,"card-content"],[1,"card-body"],[1,"col-sm-6"],[1,"col-sm-6","text-right"],[1,"font-weight-bold"],["class","font-weight-light text-secondary",4,"ngIf"],[1,"ml-2"],["placement","top","ngbTooltip","Activate Category","class","ft-power text-success",3,"click",4,"ngIf"],["placement","top","ngbTooltip","Deactivate Category","class","ft-power text-error",3,"click",4,"ngIf"],[1,"col-sm-6","mb-3"],[1,"font-weight-bold","text-center"],["class","row align-items-center",4,"ngFor","ngForOf"],[1,"col-sm-4","d-flex","justify-content-end","align-items-center","position-relative"],["onerror","src='../../../assets/img/ico/bb-brand.jpg'",1,"position-absolute","image-style",3,"src"],["type","file","accept","image/*",1,"change-input",3,"change"],["file",""],[1,"change-button"],[1,"col-sm-2","text-right","d-flex","position-relative","justify-content-end"],[1,"text-orange",3,"click"],[1,"ft-plus","text-dark"],[1,"ml-1"],[1,"btn","btn-orange","bottom-place",3,"click"],["addLabel",""],[1,"font-weight-light","text-secondary"],["placement","top","ngbTooltip","Activate Category",1,"ft-power","text-success",3,"click"],["placement","top","ngbTooltip","Deactivate Category",1,"ft-power","text-error",3,"click"],[1,"row","align-items-center"],[1,"col-12"],[1,"font-weight-normal"],[1,"col-8"],[1,"form-group","mt-3"],["type","text","placeholder","Category Name",1,"form-control",3,"id","value"],[1,"col-4","text-left"],[1,"btn","btn-orange",3,"click"],[1,"modal-header","justify-content-center"],[1,"card-title","mb-0"],[1,"modal-body"],[3,"formGroup"],[1,"form-group"],[1,"form-control",3,"change"],["value",""],[3,"value",4,"ngFor","ngForOf"],["class","form-group",4,"ngIf"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-success",3,"click"],[3,"value"],["type","text","formControlName","label","placeholder","\u0644\u06cc\u0628\u0644",1,"form-control","text-right"],["type","text","formControlName","label","placeholder","Label",1,"form-control"]],template:function(t,e){if(1&t){const t=g.Ub();g.Tb(0,"section"),g.Tb(1,"div",0),g.Tb(2,"div",1),g.Tb(3,"div",2),g.Tb(4,"div",3),g.Tb(5,"div",4),g.Tb(6,"div",0),g.Tb(7,"div",5),g.Tb(8,"h3"),g.Ic(9,"Category Detail"),g.Sb(),g.Sb(),g.Tb(10,"div",6),g.Tb(11,"span",7),g.Ic(12,"Status: "),g.Sb(),g.Gc(13,D,2,0,"span",8),g.Gc(14,G,2,0,"span",8),g.Tb(15,"a",9),g.Gc(16,M,1,0,"i",10),g.Gc(17,B,1,0,"i",11),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Tb(18,"div",0),g.Tb(19,"div",1),g.Tb(20,"div",2),g.Tb(21,"div",3),g.Tb(22,"div",4),g.Tb(23,"div",0),g.Tb(24,"div",12),g.Tb(25,"h5",13),g.Ic(26,"Category Title"),g.Sb(),g.Gc(27,N,11,3,"div",14),g.Sb(),g.Tb(28,"div",15),g.Ob(29,"img",16),g.Tb(30,"input",17,18),g.dc("change",function(){g.zc(t);const i=g.wc(31);return e.preview(i.files)}),g.Sb(),g.Tb(32,"button",19),g.Ic(33,"Change"),g.Sb(),g.Sb(),g.Tb(34,"div",20),g.Tb(35,"a",21),g.dc("click",function(){g.zc(t);const i=g.wc(42);return e.open(i)}),g.Ob(36,"span",22),g.Tb(37,"span",23),g.Ic(38," Add Label "),g.Sb(),g.Sb(),g.Tb(39,"button",24),g.dc("click",function(){return e.updateImage()}),g.Ic(40,"Update Image"),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Sb(),g.Gc(41,J,17,4,"ng-template",null,25,g.Hc)}2&t&&(g.Ab(13),g.mc("ngIf",0==e.catDetail.status),g.Ab(1),g.mc("ngIf",1==e.catDetail.status),g.Ab(2),g.mc("ngIf",0==e.catDetail.status),g.Ab(1),g.mc("ngIf",1==e.catDetail.status),g.Ab(10),g.mc("ngForOf",e.catDetail.labels),g.Ab(2),g.nc("src",e.imgURL,g.Bc))},directives:[n.o,n.n,h.p,r.u,r.l,r.f,r.o,r.t,r.a,r.k,r.d],styles:[".image-style[_ngcontent-%COMP%]{width:150px;height:150px;border-radius:15px;-o-object-fit:contain!important;object-fit:contain}.change-button[_ngcontent-%COMP%]{position:absolute;border:unset;background:rgba(0,0,0,.3);width:150px;bottom:35px;color:#fff;border-radius:0 0 15px 15px}.change-button[_ngcontent-%COMP%]:focus{outline:none!important}.bottom-place[_ngcontent-%COMP%]{position:absolute;bottom:35px;left:0;right:0}.btn[_ngcontent-%COMP%]{width:-webkit-max-content;width:-moz-max-content;width:max-content}.change-input[_ngcontent-%COMP%]{width:300px;position:absolute;bottom:35px;opacity:0;z-index:1;cursor:pointer}"]}),t})(),resolve:{data:i("Os+u").a},data:{text:"Category Detail",path:"/categorydetail/:id",nav:!0,breadcrumbs:!0}}];let H=(()=>{class t{}return t.\u0275mod=g.Lb({type:t}),t.\u0275inj=g.Kb({factory:function(e){return new(e||t)},imports:[[n.c,f.g.forChild(q),r.g,r.q,h.j]]}),t})()}}]);