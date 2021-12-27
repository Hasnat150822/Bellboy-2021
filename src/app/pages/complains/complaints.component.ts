import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ComplainsService } from './complains.service';
import { Complaint } from './model/complains';

@Component({
  selector: 'app-complains',
  templateUrl: './complaints.component.html',
  styleUrls: ['./complaints.component.scss']
})
export class ComplainsComponent implements OnInit {
  complaints$:Observable<Complaint[]>;
  spinner:boolean;
  constructor(private service:ComplainsService) { }

  ngOnInit() {
    this.getComp();
  }
  getComp(){
    this.complaints$ = this.service.getComplaints();
  }
  deleteComp(id){
    Swal.fire({
      icon:'question',
      title:'Are You Sure?',
      width:'300px'
    }).then((result)=>{
<<<<<<< HEAD
      console.log(result, 'result')
      if(result.value)
=======
      if(result)
>>>>>>> webfix/bellboy-copy
        this.service.deleteComp(id).subscribe(()=>this.getComp());
    })
  }

}
