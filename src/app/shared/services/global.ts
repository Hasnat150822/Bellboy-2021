import Swal from 'sweetalert2';
// export const url = 'http://192.168.100.5:3000/';   
// export const url = 'http://18.188.89.46:3000/';
export const url = 'https://api.bellboy.co/'; 
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
export async function confirmationDialog() {
    const result = await Swal.fire({
        icon:'question',
        text:'Are You Sure?',
        width:'300px',
        showConfirmButton:true,
        showCancelButton:true
    })
    return result;
}