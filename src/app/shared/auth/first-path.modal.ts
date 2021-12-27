export function getPath(permissions) {
    if(permissions== 'Dashboard'){
      return '/dashboard';
    }else if(permissions== 'User Management'){
      return '/usermanage';
    }else if(permissions== 'Roles Management'){
      return '/rolemanage';
    }else if(permissions== 'Categories'){
      return '/categories';
    }else if(permissions== 'Brands'){
      return '/brands';
    }else if(permissions== 'Products'){
      return '/products';
    }else if(permissions== 'Customers'){
      return '/customers';
    }else if(permissions== 'Manage Bellboy'){
      return '/bellboy';
    }else if(permissions == 'Bellboy Types'){
      return '/bellboyTypes';
    }else if(permissions == 'Manage Vehicles'){
      return '/managevehicle';
    }else if(permissions == 'Manage Vehicles Type'){
      return '/managevehicletype';
    }else if(permissions == 'Manage Brand'){
      return '/managebrand';
    }else if(permissions == 'Manage Model'){
      return '/managemodel';
    }else if(permissions == 'Assign Staus'){
      return '/assignstatus';
    }else if(permissions== 'Deliveries'){
      return '/deliveries';
    }else if(permissions== 'Hiring'){
      return '/hiring';
    }else if(permissions == 'Delivery Charges'){
      return '/finance/deliveryCharges';
    }else if(permissions == 'Hiring Charges'){
      return '/finance/hiringCharges';
    }
}