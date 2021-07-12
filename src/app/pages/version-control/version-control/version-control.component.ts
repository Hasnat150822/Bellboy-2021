import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { VersionList } from '../model/version-list';
import { VersionControlService } from '../services/version-control.service';

@Component({
  selector: 'app-version-control',
  templateUrl: './version-control.component.html',
  styleUrls: ['./version-control.component.css']
})
export class VersionControlComponent implements OnInit {
  response:VersionList;
  versionForm = new FormGroup({
    version:new FormControl('', Validators.required),
    title: new FormControl(''),
    description:new FormControl('')
  })

  constructor(private service:VersionControlService, private modalService:NgbModal) { }
  
  ngOnInit(): void {
    this.getVersions();
  }
  openModal(content){
    this.modalService.open(content, {backdrop:'static', keyboard:false});
  }
  getVersions(){
    this.service.getVersionList().subscribe((res:any)=>{
      this.response = res.versions;
    })
  }
  submitVersion(){
    let value = this.versionForm.getRawValue();
    if(value !=='')
      this.service.addVersion(value)
      .subscribe(()=>{
        this.modalService.dismissAll();
        this.versionForm.reset();
        this.getVersions();
      }, error=>{
        this.modalService.dismissAll();
        this.versionForm.reset();
        this.getVersions();
      });
  }
  changeStatus(id){
    Swal.fire({
      icon:'question',
      title:'Are You Sure',
      width:'300px',
      showCancelButton:true,
      showConfirmButton:true
    }).then(result=>{
      if(result.value){
        this.service.changeStatus(id).subscribe(()=>{
          this.getVersions();
        })
      }
    })
  }
}