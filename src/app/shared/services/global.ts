import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { Loader } from "@googlemaps/js-api-loader";``
export const url = environment.apiUrl;   
// export const url = 'http://18.188.89.46:3000/';
// export const url = 'https://192.168.100.5:3000';
export const loader = new Loader({
    apiKey: "AIzaSyCGsknFpbKkEneyVmQ0luBZwaHlv4V0KUE",
    version: "weekly",
    libraries:["places"]
  });
export const amazonUrl = 'https://bellboy-global-bucket.s3.amazonaws.com/';
export function sweetAlert(icon, message) {
    Swal.fire({
      icon:icon,
      text:message,
      width:"300px",
      timer:2500,
      showCancelButton:false,
      showConfirmButton:false
    })
}
export function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}
export var sort = function (prop, arr) {
    prop = prop.split('.');
    var len = prop.length;
    
    arr.sort(function (a, b) {
        var i = 0;
        while( i < len ) {
            a = a[prop[i]];
            b = b[prop[i]];
            i++;
        }
        if (a < b) {
            return -1;
        } else if (a > b) {
            return 1;
        } else {
            return 0;
        }
    });
    return arr;
};
export async function confirmationDialog(text) {
    const result = await Swal.fire({
        icon:'question',
        title:'Are You Sure?',
        text:text,
        width:'300px',
        showConfirmButton:true,
        showCancelButton:true
    })
    return result;
}
export function checkPage(page, totalPages) {
    if(page<1){
        return 1;
    }else if(page>totalPages && totalPages!==0){
        return totalPages;
    }else{
        return page;
    }
}
export function startDateWeek(year, week) {
    var d = new Date(year+'-01-01T00:00:00Z');
    var dayNum = d.getDay();
    var diff = --week * 7;
  
    // If 1 Jan is Friday to Sunday, go to next week
    if (!dayNum || dayNum > 4) {
      diff += 7;
    }
  
    // Add required number of days
    d.setDate(d.getDate() - d.getDay() + ++diff);
    return d;
  }
export function emptyCheck(array){
    return new Promise((reject, resolve)=>{
        let result = array.forEach((singleObject:any)=>{
        let keys = Object.keys(singleObject);
        keys.map((key:any)=>{
            singleObject[key] = singleObject[key]?singleObject[key]:'-';
        })
        })
    resolve(result)
    })
}


export function downLoadFile(data: any, name) {
    let link = url.slice(0, url.length-1)+data;
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('href', `${link}`);
    downloadLink.setAttribute('download', `${name} Report`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }