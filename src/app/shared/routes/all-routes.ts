import { Routes } from '@angular/router';
import { DashboardComponent } from 'app/layouts/full/dashboard/dashboard.component';

export const allRoutes:Routes=[
    {
      path: 'dashboard', 
    data:{
        text:'Dashoboard',
        path:'/dashboard'
      },
      component:DashboardComponent
    },
    {
      path: 'bellboy', 
      data: {
        text: 'Bellboy',
        path:'/bellboy'
      },
      loadChildren:()=>import('../../pages/bellboy/bellboy.module').then(m=>m.BellboyModule)
    },
    {
      path: 'usermanage', 
      data: {
        text: 'User Management',
        path:'/usermanage'
      },
      loadChildren:()=>import('../../pages/user-management/user.module').then(m=>m.UserManageModule)
    },
    {
      path: 'rolemanage', 
      data: {
        text: 'Roles Management',
        path:'/rolemanage'
      },
      loadChildren:()=>import('../../pages/role-management/role-management.module').then(m=>m.RoleManagementModule)
    },
    {
      path: 'categories', 
      data: {
        text: 'Categories',
        path:'/categories'
      },
      loadChildren:()=>import('../../pages/categories/categories.module').then(m=>m.CategoriesModule)
    },
    {
      path: 'brands', 
      data: {
        text: 'Brands',
        path:'/brands'
      },
      loadChildren:()=>import('../../pages/brands/brands.module').then(m=>m.BrandsModule)
    },
    {
      path: 'products', 
      data: {
        text: 'Products',
        path:'/products'
      },
      loadChildren:()=>import('../../pages/products/products.module').then(m=>m.ProductsModule)
    },
    {
      path: 'customers', 
      data: {
        animation: 'customers',
        text: 'Customers',
        path:'/customers'
      },
      loadChildren:()=>import('../../pages/customers/customers.module').then(m=>m.CustomersModule)
    },
    {
      path: 'deliveries', 
      data: { 
        text: 'Deliveries',
        path:'/deliveries'
      },
      loadChildren:()=>import('../../pages/deliveries/deliveries.module').then(m=>m.DeliveriesModule)
    },
    {
      path: 'hiring', 
      data: {
        animation: 'hiring',
        text: 'Hirings',
        path:'/hiring'
      },
      loadChildren:()=>import('../../pages/hiring/hiring.module').then(m=>m.HiringModule)
    },
    {
      path: 'locals', 
      data: {
        text: 'Locals',
        path:'/locals'
      },
      loadChildren:()=>import('../../pages/locals/locals.module').then(m=>m.LocalsModule)
    },
    {
      path:'managevehicle',
       
      data: {
        text: 'Manage Vehicles',
        path:'/managevehicle'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-vehicles/manage-vehicles.module').then(m=>m.ManageVehiclesModule)
    },
    {
      path:'managevehicletype', 
      data: {
        text: 'Manage Vehicle Type',
        path:'/managevehicletype'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-vehicle-type/manage-vehicle-type.module').then(m=>m.ManageVehicleTypeModule)
    },
    {
      path:'managebrand',  
      data: {
        text: 'Manage Brand',
        path:'/managebrand'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-brand/manage-brand.module').then(m=>m.ManageBrandModule)
    },
    {
      path:'managemodel',     
      data: {
        text: 'Manage Model',
        path:'/managemodel'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-model/manage-model.module').then(m=>m.ManageModelModule)
    },
    {
      path:'assignstatus', 
      data:{
        text: 'Assign Status',
        path:'/assignstatus'
      },
      loadChildren:()=>import('../../pages/assign-status/assign-status.module').then(m=>m.AssignStatusModule)
    },
    {
      path:'finance',
      loadChildren:()=>import('../../pages/finance/charges.module').then(m=>m.ChargesModule)
    },
    {
      path:'bellboyTypes',
      
      data:{
        text: 'Bellboy Types',
        path:'/bellboyTypes'
      },
      loadChildren:()=>import('../../pages/bellboy-types/bellboy-types.module').then(m=>m.BellboyTypesModule)
    },
    {
      path:'bellboytracing',
      
      data:{
        text: 'Bellboy Tracking',
        path:'/bellboytracing'
      },
      loadChildren:()=>import('../../pages/bellboy-tracking/bellboy-tracking.module').then(m=>m.BellboyTrackingModule)
    },
    {
      path:'hiringactiontype', 
      data:{
        text:'Hiring Action Types',
        path:'/hiringactiontype'
      },
      loadChildren:()=>import('../../pages/hiring-actions/hiring-actions.module').then(m=>m.HiringActionsModule)
    },
    {
      path:'myprofile/:id',
      
      data:{
        text:'My Profile',
        path:'/myprofile/:id'
      },
      loadChildren:()=>import('../../pages/my-profile/my-profile.module').then(m=>m.MyProfileModule)
    },
    {
      path:'reports', 
      loadChildren:()=>import('../../pages/reports/reports.module').then(m=>m.ReportsModule)
    },
    {
      path:'advertisement' ,
      loadChildren:()=>import('../../pages/advertisement/advertisement.module').then(m=>m.AdvertisementModule)
    },
    {
      path:'notification?type=customer', 
      data:{
        text:'Customer Notification',
        path:'/notification'
      },
      loadChildren:()=>import('../../pages/notification/notification.module').then(m=>m.NotificationModule)
    },
    {
      path:'notification?type=bellboy', 
      data:{
        text:'Bellboy Notification',
        path:'/notification'
      },
      loadChildren:()=>import('../../pages/notification/notification.module').then(m=>m.NotificationModule)
    },
    {
      path:'complaints', 
      data:{
        text:'Complaints',
        path:'/complains'
      },
      loadChildren:()=>import('../../pages/complains/complaints.module').then(m=>m.ComplainsModule)
    },
    {
      path:'versionControl', 
      data:{
        text:'Version Control',
        path:'/versionControl'
      },
      loadChildren:()=>import('../../pages/version-control/version-control.module').then(m=>m.VersionControlModule)
    },
    {
      path: 'commissions', 
      data: {
        text: 'Commissions',
        path:'/commissions'
      },
      loadChildren:()=>import('../../pages/commissions/commissions.module').then(m=>m.CommissionsModule)
    },{
      path: 'wallet', 
      data: {
        text: 'Wallet',
        path:'/wallet'
      },
      loadChildren:()=>import('../../pages/wallet/wallet.module').then(m=>m.WalletModule)
    },
    {
      path: 'wallet', 
      data: {
        text: 'Wallet',
        path:'/wallet'
      },
      loadChildren:()=>import('../../pages/wallet/wallet.module').then(m=>m.WalletModule)
    },
    {
      path: 'customerOffers', 
      data: {
        text: 'Customer Offers',
        path:'/customerOffers'
      },
      loadChildren:()=>import('../../pages/offers/offers.module').then(m=>m.OffersModule)
    },
    {
      path: 'bellboyOffers', 
      data: {
        text: 'Bellboy Offers',
        path:'/bellboyOffers'
      },
      loadChildren:()=>import('../../pages/offers/offers.module').then(m=>m.OffersModule)
    }
  ]