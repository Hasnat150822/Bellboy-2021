!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function n(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[32],{QMXj:function(t,i,c){"use strict";c.r(i),c.d(i,"VersionControlModule",function(){return G});var o,r,s,b=c("ofXK"),a=c("3Pt+"),u=c("PSD3"),d=c.n(u),l=c("tk/3"),f=c("q2CC"),v=c("tkbi"),p=c("lJxs"),m=c("vkgz"),h=c("fXoL"),S=((s=function(){function t(n,i){e(this,t),this.gs=n,this.http=i,this.gs.token.subscribe(function(e){var t=e;o={headers:new l.c({Authorization:"bearer "+t})},r={headers:new l.c({"Content-Type":"application/x-www-form-urlencoded",Authorization:"bearer "+t})}})}return n(t,[{key:"getVersionList",value:function(){return this.http.get(f.f+"api/admin/version",o).pipe(Object(p.a)(function(e){return e.data}))}},{key:"addVersion",value:function(e){var t=e.version,n=e.title,i=e.description,c=(new l.d).set("version",t).set("title",n).set("description",i);return this.http.post(f.f+"api/admin/version",c.toString(),r).pipe(Object(m.a)(function(e){e.success?Object(f.e)("success","Version Added Successfully"):Object(f.e)("warning",e.message)},function(e){return Object(f.e)("error",e.error.message)}))}},{key:"changeStatus",value:function(e){return this.http.put(f.f+"api/admin/version/activate/"+e,"",r).pipe(Object(m.a)(function(e){e.success?Object(f.e)("success","Version is Activated"):Object(f.e)("warning",e.message)},function(e){Object(f.e)("error",e.error.message)}))}}]),t}()).\u0275fac=function(e){return new(e||s)(h.ac(v.a),h.ac(l.a))},s.\u0275prov=h.Jb({token:s,factory:s.\u0275fac}),s),T=c("1kSV");function g(e,t){1&e&&h.Pb(0)}function y(e,t){1&e&&h.Pb(0)}function w(e,t){1&e&&(h.Tb(0,"tr"),h.Tb(1,"td",9),h.Ob(2,"div",10),h.Sb(),h.Sb())}function A(e,t){1&e&&(h.Tb(0,"tr"),h.Tb(1,"th"),h.Ic(2,"Version"),h.Sb(),h.Tb(3,"th"),h.Ic(4,"Title"),h.Sb(),h.Tb(5,"th",11),h.Ic(6,"Description"),h.Sb(),h.Tb(7,"th"),h.Ic(8,"Status"),h.Sb(),h.Tb(9,"th"),h.Ic(10,"AddedBy"),h.Sb(),h.Tb(11,"th"),h.Ic(12,"Date"),h.Sb(),h.Tb(13,"th"),h.Ic(14,"Time"),h.Sb(),h.Tb(15,"th"),h.Ic(16,"Actions"),h.Sb(),h.Sb())}function k(e,t){if(1&e){var n=h.Ub();h.Tb(0,"tr"),h.Tb(1,"td"),h.Ic(2),h.Sb(),h.Tb(3,"td"),h.Ic(4),h.Sb(),h.Tb(5,"td",13),h.Ic(6),h.Sb(),h.Tb(7,"td",14),h.Ic(8),h.Sb(),h.Tb(9,"td"),h.Ic(10),h.Sb(),h.Tb(11,"td"),h.Ic(12),h.gc(13,"date"),h.Sb(),h.Tb(14,"td"),h.Ic(15),h.gc(16,"date"),h.Sb(),h.Tb(17,"td"),h.Tb(18,"button",15),h.dc("click",function(){h.zc(n);var e=t.$implicit;return h.fc(2).sendId(e._id)}),h.Ic(19),h.Sb(),h.Sb(),h.Sb()}if(2&e){var i=t.$implicit;h.Ab(2),h.Kc(" ",i.version," "),h.Ab(2),h.Jc(i.title),h.Ab(2),h.Jc(i.description),h.Ab(1),h.mc("ngClass",0==i.active?"text-danger":"text-success"),h.Ab(1),h.Jc(0==i.active?"Deactive":"Active"),h.Ab(2),h.Kc(" ",i.addedBy.name," "),h.Ab(2),h.Jc(h.ic(13,10,i.created_at,"mediumDate")),h.Ab(3),h.Jc(h.ic(16,13,i.created_at,"mediumTime")),h.Ab(3),h.mc("ngClass",0==i.active?"btn-success":"btn-danger"),h.Ab(1),h.Jc(0==i.active?"Activate":"Deactivate")}}function I(e,t){if(1&e&&h.Gc(0,k,20,16,"tr",12),2&e){var n=h.fc();h.mc("ngForOf",n.versionList)}}var V,O=((V=function(){function t(){e(this,t),this.id=new h.n}return n(t,[{key:"ngOnInit",value:function(){}},{key:"sendId",value:function(e){this.id.emit(e)}}]),t}()).\u0275fac=function(e){return new(e||V)},V.\u0275cmp=h.Hb({type:V,selectors:[["app-version-history"]],inputs:{versionList:"versionList"},outputs:{id:"id"},decls:15,vars:2,consts:[[1,"card"],[1,"card-body"],[1,"row"],[1,"col-12"],[1,"table","table-responsive-md","table-striped","text-left"],[4,"ngTemplateOutlet"],["shimmer",""],["tableHead",""],["tableData",""],["colspan","12"],[1,"py-3","shine","w-100"],[1,"text-left"],[4,"ngFor","ngForOf"],[1,"w-25"],[3,"ngClass"],[1,"btn",3,"ngClass","click"]],template:function(e,t){if(1&e&&(h.Tb(0,"div",0),h.Tb(1,"div",1),h.Tb(2,"div",2),h.Tb(3,"div",3),h.Tb(4,"table",4),h.Tb(5,"thead"),h.Gc(6,g,1,0,"ng-container",5),h.Sb(),h.Tb(7,"tbody"),h.Gc(8,y,1,0,"ng-container",5),h.Sb(),h.Sb(),h.Sb(),h.Sb(),h.Sb(),h.Sb(),h.Gc(9,w,3,0,"ng-template",null,6,h.Hc),h.Gc(11,A,17,0,"ng-template",null,7,h.Hc),h.Gc(13,I,1,1,"ng-template",null,8,h.Hc)),2&e){var n=h.wc(10),i=h.wc(12),c=h.wc(14);h.Ab(6),h.mc("ngTemplateOutlet",i),h.Ab(2),h.mc("ngTemplateOutlet",t.versionList?c:n)}},directives:[b.p,b.n,b.m],pipes:[b.f],styles:[""]}),V);function C(e,t){if(1&e){var n=h.Ub();h.Tb(0,"div",8),h.Tb(1,"h3",9),h.Ic(2,"Add Version"),h.Sb(),h.Tb(3,"a",10),h.dc("click",function(){return t.$implicit.close("Cancel Modal")}),h.Ob(4,"i",11),h.Sb(),h.Sb(),h.Tb(5,"div",12),h.Tb(6,"form",13),h.dc("ngSubmit",function(){return h.zc(n),h.fc().submitVersion()}),h.Tb(7,"div",14),h.Ob(8,"input",15),h.Sb(),h.Tb(9,"div",14),h.Ob(10,"input",16),h.Sb(),h.Tb(11,"div",14),h.Ob(12,"input",17),h.Sb(),h.Tb(13,"div",18),h.Tb(14,"button",19),h.Ic(15," Add Version "),h.Sb(),h.Sb(),h.Sb(),h.Sb()}if(2&e){var i=h.fc();h.Ab(6),h.mc("formGroup",i.versionForm),h.Ab(8),h.mc("disabled",i.versionForm.invalid)}}var j,x,J=((j=function(){function t(n,i){e(this,t),this.service=n,this.modalService=i,this.versionForm=new a.e({version:new a.c("",a.s.required),title:new a.c(""),description:new a.c("")})}return n(t,[{key:"ngOnInit",value:function(){this.getVersions()}},{key:"openModal",value:function(e){this.modalService.open(e)}},{key:"getVersions",value:function(){var e=this;this.service.getVersionList().subscribe(function(t){e.response=t.versions})}},{key:"submitVersion",value:function(){var e=this,t=this.versionForm.getRawValue();""!==t&&this.service.addVersion(t).subscribe(function(){e.modalService.dismissAll(),e.versionForm.reset(),e.getVersions()},function(t){e.modalService.dismissAll(),e.versionForm.reset(),e.getVersions()})}},{key:"changeStatus",value:function(e){var t=this;d.a.fire({icon:"question",title:"Are You Sure",width:"300px",showCancelButton:!0,showConfirmButton:!0}).then(function(n){n.value&&t.service.changeStatus(e).subscribe(function(){t.getVersions()})})}}]),t}()).\u0275fac=function(e){return new(e||j)(h.Nb(S),h.Nb(T.i))},j.\u0275cmp=h.Hb({type:j,selectors:[["app-version-control"]],decls:12,vars:1,consts:[["id","tabs"],[1,"row","text-left","mt-2"],[1,"col-6","mb-1"],[1,"mb-0"],[1,"col-6","text-right"],[1,"btn","btn-orange",3,"click"],[3,"versionList","id"],["addVersion",""],[1,"modal-header","justify-content-center","mb-1"],[1,"card-title","mb-0"],[3,"click"],[1,"ft-x","close-icon"],[1,"modal-body"],[1,"row",3,"formGroup","ngSubmit"],[1,"form-group","col-12"],["type","text","placeholder","Type Version","formControlName","version",1,"form-control"],["type","text","placeholder","Type Title","formControlName","title",1,"form-control"],["type","text","placeholder","Type Description","formControlName","description",1,"form-control"],[1,"modal-footer","ml-auto"],["type","submit",1,"btn","btn-orange",3,"disabled"]],template:function(e,t){if(1&e){var n=h.Ub();h.Tb(0,"section",0),h.Tb(1,"div",1),h.Tb(2,"div",2),h.Tb(3,"h3",3),h.Ic(4,"Version Control"),h.Sb(),h.Sb(),h.Tb(5,"div",4),h.Tb(6,"button",5),h.dc("click",function(){h.zc(n);var e=h.wc(11);return t.openModal(e)}),h.Ic(7,"Add Version"),h.Sb(),h.Sb(),h.Sb(),h.Tb(8,"app-version-history",6),h.dc("id",function(e){return t.changeStatus(e)}),h.Sb(),h.Sb(),h.Tb(9,"section"),h.Gc(10,C,16,2,"ng-template",null,7,h.Hc),h.Sb()}2&e&&(h.Ab(8),h.mc("versionList",t.response))},directives:[O,a.u,a.l,a.f,a.a,a.k,a.d],styles:[""]}),j),L=c("tyNb"),F=[{path:"",component:J}],G=((x=function t(){e(this,t)}).\u0275mod=h.Lb({type:x}),x.\u0275inj=h.Kb({factory:function(e){return new(e||x)},providers:[S],imports:[[b.c,a.q,L.g.forChild(F)]]}),x)}}])}();