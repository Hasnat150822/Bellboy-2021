!function(){function t(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function e(t,e){for(var b=0;b<e.length;b++){var c=e[b];c.enumerable=c.enumerable||!1,c.configurable=!0,"value"in c&&(c.writable=!0),Object.defineProperty(t,c.key,c)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"48Hu":function(b,c,n){"use strict";n.r(c),n.d(c,"LocalsModule",function(){return T});var o=n("ofXK"),i=n("1kSV"),l=n("fXoL");function r(t,e){1&t&&(l.Tb(0,"div",12),l.Tb(1,"h3",13),l.Ic(2,"Add Locals"),l.Sb(),l.Sb(),l.Tb(3,"div",14),l.Tb(4,"form"),l.Tb(5,"div",15),l.Ob(6,"input",16),l.Sb(),l.Tb(7,"div",15),l.Ob(8,"input",17),l.Sb(),l.Sb(),l.Sb(),l.Tb(9,"div",18),l.Tb(10,"button",19),l.dc("click",function(){return e.$implicit.close("Cross click")}),l.Ic(11,"Cancel"),l.Sb(),l.Tb(12,"button",20),l.dc("click",function(){return e.$implicit.close("Save click")}),l.Ic(13,"Add Local"),l.Sb(),l.Sb())}var a,d,s=((a=function(){function b(e){t(this,b),this.modalService=e,this.closeResult=""}var c,n,o;return c=b,(n=[{key:"ngOnInit",value:function(){}},{key:"open",value:function(t){var e=this;this.modalService.open(t,{ariaLabelledBy:"modal-basic-title"}).result.then(function(t){e.closeResult="Closed with: "+t},function(t){e.closeResult="Dismissed "+e.getDismissReason(t)})}},{key:"getDismissReason",value:function(t){return t===i.a.ESC?"by pressing ESC":t===i.a.BACKDROP_CLICK?"by clicking on a backdrop":"with: "+t}}])&&e(c.prototype,n),o&&e(c,o),b}()).\u0275fac=function(t){return new(t||a)(l.Nb(i.i))},a.\u0275cmp=l.Hb({type:a,selectors:[["app-locals"]],decls:43,vars:0,consts:[["id","tabs"],[1,"row","text-left","mb-2","mt-2"],[1,"col-sm-6","mb-1"],[1,"col-sm-6","text-right"],[1,"btn","btn-orange","mb-0",3,"click"],[1,"row","text-left"],[1,"col-md-12","col-lg-12"],[1,"card"],[1,"card-content"],[1,"card-body"],[1,"table","table-responsive-md","table-striped"],["addlocal",""],[1,"modal-header","justify-content-center"],[1,"card-title","mb-0"],[1,"modal-body"],[1,"form-group"],["type","text","placeholder","Title",1,"form-control"],["type","text","placeholder","Code",1,"form-control"],[1,"modal-footer"],["type","button",1,"btn","btn-secondary",3,"click"],["type","button",1,"btn","btn-success",3,"click"]],template:function(t,e){if(1&t){var b=l.Ub();l.Tb(0,"section",0),l.Tb(1,"div",1),l.Tb(2,"div",2),l.Tb(3,"h3"),l.Ic(4,"Locals"),l.Sb(),l.Sb(),l.Tb(5,"div",3),l.Tb(6,"button",4),l.dc("click",function(){l.zc(b);var t=l.wc(42);return e.open(t)}),l.Ic(7,"Add Local"),l.Sb(),l.Sb(),l.Sb(),l.Tb(8,"div",5),l.Tb(9,"div",6),l.Tb(10,"div",7),l.Tb(11,"div",8),l.Tb(12,"div",9),l.Tb(13,"table",10),l.Tb(14,"thead"),l.Tb(15,"tr"),l.Tb(16,"th"),l.Ic(17,"Title"),l.Sb(),l.Tb(18,"th"),l.Ic(19,"Code"),l.Sb(),l.Sb(),l.Sb(),l.Tb(20,"tbody"),l.Tb(21,"tr"),l.Tb(22,"td"),l.Ic(23,"Urdu"),l.Sb(),l.Tb(24,"td"),l.Ic(25,"ur"),l.Sb(),l.Sb(),l.Tb(26,"tr"),l.Tb(27,"td"),l.Ic(28,"English"),l.Sb(),l.Tb(29,"td"),l.Ic(30,"eng"),l.Sb(),l.Sb(),l.Tb(31,"tr"),l.Tb(32,"td"),l.Ic(33,"Urdu"),l.Sb(),l.Tb(34,"td"),l.Ic(35,"ur"),l.Sb(),l.Sb(),l.Tb(36,"tr"),l.Tb(37,"td"),l.Ic(38,"English"),l.Sb(),l.Tb(39,"td"),l.Ic(40,"eng"),l.Sb(),l.Sb(),l.Sb(),l.Sb(),l.Sb(),l.Sb(),l.Sb(),l.Sb(),l.Sb(),l.Sb(),l.Gc(41,r,14,0,"ng-template",null,11,l.Hc)}},styles:[""]}),a),u=n("tyNb"),S=[{path:"",component:s}],T=((d=function e(){t(this,e)}).\u0275mod=l.Lb({type:d}),d.\u0275inj=l.Kb({factory:function(t){return new(t||d)},imports:[[o.c,u.g.forChild(S)]]}),d)}}])}();