!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function i(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{fKCV:function(t,n,c){"use strict";c.r(n),c.d(n,"appRouting",function(){return L}),c.d(n,"ManageVehicleTypeModule",function(){return B});var r=c("ofXK"),o=c("mrSG"),a=c("3Pt+"),b=c("Ewgu"),l=c("PSD3"),s=c.n(l),u=c("tkbi"),d=c("q2CC"),p=c("fXoL"),m=c("1kSV"),f=c("tyNb");function h(e,t){1&e&&p.Pb(0)}var v=function(e){return["/managevehicletype/vehicleTypeDetail",e]};function T(e,t){if(1&e&&(p.Tb(0,"tr"),p.Tb(1,"td"),p.Ic(2),p.Sb(),p.Tb(3,"td"),p.Tb(4,"a"),p.Ob(5,"img",16),p.Sb(),p.Sb(),p.Tb(6,"td"),p.Ic(7,"Hasnat Hameed"),p.Sb(),p.Tb(8,"td"),p.Tb(9,"a",17),p.Ob(10,"img",18),p.Sb(),p.Sb(),p.Sb()),2&e){var i=t.$implicit,n=p.fc();p.Ab(2),p.Jc(i.title),p.Ab(3),p.pc("src","",n.amazonImgUrl,"",i.icon,"",p.Bc),p.Ab(4),p.mc("routerLink",p.rc(4,v,i._id))}}function g(e,t){if(1&e&&(p.Tb(0,"p",37),p.Ic(1),p.Sb()),2&e){var i=p.fc(2);p.Ab(1),p.Jc(i.message)}}function S(e,t){1&e&&(p.Tb(0,"p",38),p.Ic(1," Vehicle Type is required. "),p.Sb())}function y(e,t){if(1&e){var i=p.Ub();p.Tb(0,"div",19),p.Tb(1,"h3",20),p.Ic(2,"Add Vehicle Type"),p.Sb(),p.Tb(3,"a",21),p.dc("click",function(){return t.$implicit.close("Cancel Modal")}),p.Ob(4,"i",22),p.Sb(),p.Sb(),p.Tb(5,"div",23),p.Tb(6,"form"),p.Tb(7,"div",24),p.Tb(8,"div",25),p.Tb(9,"input",26,27),p.dc("change",function(){p.zc(i);var e=p.wc(10);return p.fc().preview(e.files)}),p.Sb(),p.Tb(11,"button",28),p.Ic(12,"Add Icon"),p.Sb(),p.Tb(13,"div",29),p.Ob(14,"img",30),p.Gc(15,g,2,1,"p",31),p.Sb(),p.Sb(),p.Sb(),p.Tb(16,"div",32),p.Ob(17,"input",33),p.Gc(18,S,2,0,"p",34),p.Sb(),p.Sb(),p.Sb(),p.Tb(19,"div",35),p.Tb(20,"div"),p.Tb(21,"button",36),p.dc("click",function(){p.zc(i);var e=p.fc();return e.addVehicle(e.vehicleType)}),p.Ic(22,"Add Type"),p.Sb(),p.Sb(),p.Sb()}if(2&e){var n=p.fc();p.Ab(14),p.nc("src",n.imgURL,p.Bc),p.Ab(1),p.mc("ngIf",n.message),p.Ab(1),p.mc("formGroup",n.vehicleType),p.Ab(2),p.mc("ngIf",n.submitted&&n.vehicleType.controls.type.hasError("required"))}}function w(e,t){1&e&&(p.Tb(0,"tr"),p.Tb(1,"td",40),p.Ob(2,"div",41),p.Sb(),p.Sb())}function k(e,t){if(1&e&&p.Gc(0,w,3,0,"tr",39),2&e){var i=p.fc();p.mc("ngIf",i.spinner)}}function I(e,t){if(1&e&&(p.Tb(0,"div",14),p.Tb(1,"input",15),p.dc("valueChange",function(e){return t.$implicit.label=e}),p.Sb(),p.Sb()),2&e){var i=t.$implicit;p.Ab(1),p.mc("value",i.label)}}function x(e,t){1&e&&(p.Tb(0,"div",16),p.Tb(1,"h3",17),p.Ic(2,"Add Label"),p.Sb(),p.Tb(3,"a",18),p.dc("click",function(){return t.$implicit.close("Cancel Modal")}),p.Ob(4,"i",19),p.Sb(),p.Sb(),p.Tb(5,"div",20),p.Tb(6,"form"),p.Tb(7,"div",14),p.Tb(8,"select",21),p.Tb(9,"option",22),p.Ic(10,"Select Language"),p.Sb(),p.Tb(11,"option"),p.Ic(12,"Urdu"),p.Sb(),p.Tb(13,"option"),p.Ic(14,"English"),p.Sb(),p.Sb(),p.Sb(),p.Tb(15,"div",14),p.Ob(16,"input",23),p.Sb(),p.Sb(),p.Sb(),p.Tb(17,"div",24),p.Tb(18,"button",25),p.dc("click",function(){return t.$implicit.close("save")}),p.Ic(19,"Add Label"),p.Sb(),p.Sb())}var V,A,O,C=[{path:"",component:(A=function(){function t(i,n,c,r){e(this,t),this.modalService=i,this.globalService=n,this.fb=c,this.vehicleTypeService=r,this.amazonImgUrl=d.a,this.allVehicleTypes=[],this.vehicleType=this.fb.group({type:["",a.s.required]})}return i(t,[{key:"open",value:function(e){this.modalService.open(e,{ariaLabelledBy:"modal-basic-title"})}},{key:"preview",value:function(e){return Object(o.a)(this,void 0,void 0,regeneratorRuntime.mark(function t(){var i=this;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(this.imageFile=e[0],0!==e.length){t.next=2;break}return t.abrupt("return",!1);case 2:if(null==e[0].type.match(/image\/*/)){t.next=8;break}return t.next=5,function(e){return new Promise(function(t,i){var n=new FileReader;n.readAsDataURL(e[0]),n.onload=function(){return t(n.result)},n.onerror=function(e){return i(e)}})}(e).then(function(e){i.imgURL=e});case 5:this.globalService.compress(this.imgURL,e[0].name).then(function(e){var t=e[0];if(1==t.status)return i.imageFile=t.file,void(i.imgURL=t.con64)}),t.next=9;break;case 8:this.message="Only images are supported.";case 9:case"end":return t.stop()}},t,this)}))}},{key:"ngOnInit",value:function(){this.getVehicleType()}},{key:"getVehicleType",value:function(){var e=this;this.spinner=!0,this.vehicleTypeService.getVehicleType().subscribe(function(t){e.allVehicleTypes=t.data.VehicleTypes,e.spinner=!1})}},{key:"addVehicle",value:function(e){var t=this,i=e.getRawValue().type;if(this.submitted=!0,!e.valid)return!1;this.vehicleTypeService.addVehiceType(i,this.imageFile,!0).subscribe(function(i){!0===i.success?(t.getVehicleType(),e.reset(),s.a.fire({icon:"success",text:"Added",width:"400px",timer:2500,showCancelButton:!1,showConfirmButton:!1}),t.modalService.dismissAll()):(e.reset(),s.a.fire({icon:"error",text:i.message,width:"400px",timer:2500,showCancelButton:!1,showConfirmButton:!1}),t.modalService.dismissAll())},function(i){t.modalService.dismissAll(),e.reset(),s.a.fire({icon:"error",text:i.error.message,width:"400px",timer:2500,showCancelButton:!1,showConfirmButton:!1})})}}]),t}(),A.\u0275fac=function(e){return new(e||A)(p.Nb(m.i),p.Nb(u.a),p.Nb(a.b),p.Nb(b.a))},A.\u0275cmp=p.Hb({type:A,selectors:[["app-manage-vehicle-type"]],decls:31,vars:2,consts:[["id","tabs"],[1,"row","text-left","mt-2"],[1,"col-sm-6","mb-1"],[1,"mb-0"],[1,"col-sm-6","text-right"],[1,"btn","btn-orange","mb-0",3,"click"],[1,"row","text-left"],[1,"col-md-12","col-lg-12"],[1,"card"],[1,"card-content"],[1,"card-body"],[1,"table","table-responsive-md","table-striped"],[4,"ngTemplateOutlet"],[4,"ngFor","ngForOf"],["addBrand",""],["shimmer",""],["alt","",1,"table-img-size",3,"src"],[1,"p-0","text-dark",3,"routerLink"],["src","../../../assets/img/ico/eye.png","alt","",1,"img-eye"],[1,"modal-header","justify-content-center","mb-1"],[1,"card-title","mb-0"],[3,"click"],[1,"ft-x","close-icon"],[1,"modal-body","pb-0"],[1,"form-group"],[1,"position-relative","position-relative"],["accept","image/*","accept","image/*","type","file",1,"upload-input",3,"change"],["file",""],[1,"camera-icon","btn","btn-orange"],[1,"text-center"],["onerror","src='../../../../assets/img/ico/no-icon.png'",1,"upload-image",3,"src"],["class","text-error mb-0",4,"ngIf"],[1,"form-group",3,"formGroup"],["type","text","placeholder","Vehicle Type","formControlName","type",1,"form-control"],["class","text-error",4,"ngIf"],[1,"modal-footer","mb-2"],["type","button",1,"btn","btn-success",3,"click"],[1,"text-error","mb-0"],[1,"text-error"],[4,"ngIf"],["colspan","12"],[1,"py-3","shine","w-100"]],template:function(e,t){if(1&e){var i=p.Ub();p.Tb(0,"section",0),p.Tb(1,"div",1),p.Tb(2,"div",2),p.Tb(3,"h3",3),p.Ic(4,"Manage Vehicles Type"),p.Sb(),p.Sb(),p.Tb(5,"div",4),p.Tb(6,"button",5),p.dc("click",function(){p.zc(i);var e=p.wc(28);return t.open(e)}),p.Ic(7,"Add Vehicle Type"),p.Sb(),p.Sb(),p.Sb(),p.Tb(8,"div",6),p.Tb(9,"div",7),p.Tb(10,"div",8),p.Tb(11,"div",9),p.Tb(12,"div",10),p.Tb(13,"table",11),p.Tb(14,"thead"),p.Tb(15,"tr"),p.Tb(16,"th"),p.Ic(17,"Vehicle Type"),p.Sb(),p.Tb(18,"th"),p.Ic(19,"Icon"),p.Sb(),p.Tb(20,"th"),p.Ic(21,"Created By"),p.Sb(),p.Tb(22,"th"),p.Ic(23,"View / Update"),p.Sb(),p.Sb(),p.Sb(),p.Tb(24,"tbody"),p.Gc(25,h,1,0,"ng-container",12),p.Gc(26,T,11,6,"tr",13),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Gc(27,y,23,4,"ng-template",null,14,p.Hc),p.Gc(29,k,1,1,"ng-template",null,15,p.Hc)}if(2&e){var n=p.wc(30);p.Ab(25),p.mc("ngTemplateOutlet",n),p.Ab(1),p.mc("ngForOf",t.allVehicleTypes)}},directives:[r.p,r.n,f.f,a.u,a.l,a.m,r.o,a.f,a.a,a.k,a.d],styles:[".ng2-smart-page-item[_ngcontent-%COMP%]{line-height:unset;margin:0!important}"]}),A)},{path:"vehicleTypeDetail/:id",component:(V=function(){function t(i,n,c){e(this,t),this.modalService=i,this.route=n,this.vehicleTypeService=c}return i(t,[{key:"ngOnInit",value:function(){var e=this;this.route.params.subscribe(function(t){e._id=t.id}),this.getSingleVehicleType()}},{key:"getSingleVehicleType",value:function(){var e=this;this.vehicleTypeService.vehicleTyeDetail(this._id).subscribe(function(t){e.vehicleTypeDetail=t.data})}},{key:"open",value:function(e){this.modalService.open(e,{ariaLabelledBy:"modal-basic-title"})}}]),t}(),V.\u0275fac=function(e){return new(e||V)(p.Nb(m.i),p.Nb(f.a),p.Nb(b.a))},V.\u0275cmp=p.Hb({type:V,selectors:[["app-vehicle-type-detail"]],decls:21,vars:1,consts:[[1,"row"],[1,"col-sm-12"],[1,"card"],[1,"card-content"],[1,"card-body"],[1,"col-sm-6"],[1,"font-weight-normal"],[1,"col-sm-6","text-right"],[1,"text-orange",3,"click"],[1,"ft-plus","text-dark"],[1,"ml-1"],[1,"col-sm-5"],["class","form-group",4,"ngFor","ngForOf"],["addLabel",""],[1,"form-group"],["type","text","readonly","","placeholder","Vehicle Type",1,"form-control",3,"value","valueChange"],[1,"modal-header","justify-content-center"],[1,"card-title","mb-0"],[3,"click"],[1,"ft-x","close-icon"],[1,"modal-body"],[1,"form-control"],["value",""],["type","text","placeholder","Label",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-success",3,"click"]],template:function(e,t){if(1&e){var i=p.Ub();p.Tb(0,"section"),p.Tb(1,"form"),p.Tb(2,"div",0),p.Tb(3,"div",1),p.Tb(4,"div",2),p.Tb(5,"div",3),p.Tb(6,"div",4),p.Tb(7,"div",0),p.Tb(8,"div",5),p.Tb(9,"h5",6),p.Ic(10,"Vehicle Type"),p.Sb(),p.Ob(11,"br"),p.Sb(),p.Tb(12,"div",7),p.Tb(13,"a",8),p.dc("click",function(){p.zc(i);var e=p.wc(20);return t.open(e)}),p.Ob(14,"span",9),p.Tb(15,"span",10),p.Ic(16," Add Label "),p.Sb(),p.Sb(),p.Sb(),p.Tb(17,"div",11),p.Gc(18,I,2,1,"div",12),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Sb(),p.Gc(19,x,20,0,"ng-template",null,13,p.Hc)}2&e&&(p.Ab(18),p.mc("ngForOf",null==t.vehicleTypeDetail?null:t.vehicleTypeDetail.labels))},directives:[a.u,a.l,a.m,r.n,a.o,a.t],styles:[""]}),V),resolve:{data:c("Os+u").a},data:{text:"Vehicle Type Detail",path:"/vehicleTypeDetail/:id"}}],L=f.g.forRoot(C,{relativeLinkResolution:"legacy"}),B=((O=function t(){e(this,t)}).\u0275mod=p.Lb({type:O}),O.\u0275inj=p.Kb({factory:function(e){return new(e||O)},imports:[[r.c,a.g,m.j,a.q,f.g.forChild(C)]]}),O)}}])}();