import { ResolverService } from '../services/resolver.service';

export const allRoutes=[
    {
      path: 'dashboard',resolve:{data:ResolverService}, useHash: true ,
    data:{
        text:'Dashoboard',
        path:'/dashboard'
      },
      loadChildren: ()=>import('../../pages/dashboard/dashboard.module').then(m=>m.DashboardModule)
    },
    {
      path: 'bellboy',resolve:{data:ResolverService}, useHash: true ,
      data: {
        text: 'Bellboy',
        path:'/bellboy'
      },
      loadChildren:()=>import('../../pages/bellboy/bellboy.module').then(m=>m.BellboyModule)
    },
    {
      path: 'usermanage',resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'User Management',
        path:'/usermanage'
      },
      loadChildren:()=>import('../../pages/user-management/user.module').then(m=>m.UserManageModule)
    },
    {
      path: 'rolemanage',resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Roles Management',
        path:'/rolemanage'
      },
      loadChildren:()=>import('../../pages/role-management/role-management.module').then(m=>m.RoleManagementModule)
    },
    {
      path: 'categories',resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Categories',
        path:'/categories'
      },
      loadChildren:()=>import('../../pages/categories/categories.module').then(m=>m.CategoriesModule)
    },
    {
      path: 'brands',resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Brands',
        path:'/brands'
      },
      loadChildren:()=>import('../../pages/brands/brands.module').then(m=>m.BrandsModule)
    },
    {
      path: 'products',resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Products',
        path:'/products'
      },
      loadChildren:()=>import('../../pages/products/products.module').then(m=>m.ProductsModule)
    },
    {
      path: 'customers',resolve:{data:ResolverService}, useHash: true,
      data: {
        animation: 'customers',
        text: 'Customers',
        path:'/customers'
      },
      loadChildren:()=>import('../../pages/customers/customers.module').then(m=>m.CustomersModule)
    },
    {
      path: 'deliveries',resolve:{data:ResolverService}, useHash: true,
      data: { 
        text: 'Deliveries',
        path:'/deliveries'
      },
      loadChildren:()=>import('../../pages/deliveries/deliveries.module').then(m=>m.DeliveriesModule)
    },
    {
      path: 'hiring',resolve:{data:ResolverService}, useHash: true,
      data: {
        animation: 'hiring',
        text: 'Hiring',
        path:'/hiring'
      },
      loadChildren:()=>import('../../pages/hiring/hiring.module').then(m=>m.HiringModule)
    },
    {
      path: 'locals',resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Locals',
        path:'/locals'
      },
      loadChildren:()=>import('../../pages/locals/locals.module').then(m=>m.LocalsModule)
    },
    {
      path:'managevehicle',
      resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Manage Vehicles',
        path:'/managevehicle'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-vehicles/manage-vehicles.module').then(m=>m.ManageVehiclesModule)
    },
    {
      path:'managevehicletype',resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Manage Vehicle Type',
        path:'/managevehicletype'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-vehicle-type/manage-vehicle-type.module').then(m=>m.ManageVehicleTypeModule)
    },
    {
      path:'managebrand', resolve:{data:ResolverService}, useHash: true,
      data: {
        text: 'Manage Brand',
        path:'/managebrand'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-brand/manage-brand.module').then(m=>m.ManageBrandModule)
    },
    {
      path:'managemodel',resolve:{data:ResolverService},  useHash: true,   
      data: {
        text: 'Manage Model',
        path:'/managemodel'
      },
      loadChildren:()=>import('../../pages/vehicles/manage-model/manage-model.module').then(m=>m.ManageModelModule)
    },
    {
      path:'assignstatus',resolve:{data:ResolverService}, useHash: true,
      data:{
        text: 'Assign Status',
        path:'/assignstatus'
      },
      loadChildren:()=>import('../../pages/assign-status/assign-status.module').then(m=>m.AssignStatusModule)
    },
    {
      path:'finance',
      useHash: true,
      loadChildren:()=>import('../../pages/finance/finance.module').then(m=>m.FinanceModule)
    },
    {
      path:'bellboyTypes',resolve:{data:ResolverService},
      useHash: true,
      data:{
        text: 'Bellboy Types',
        path:'/bellboyTypes'
      },
      loadChildren:()=>import('../../pages/bellboy-types/bellboy-types.module').then(m=>m.BellboyTypesModule)
    },
    {
      path:'bellboytracing',resolve:{data:ResolverService},
      useHash: true,
      data:{
        text: 'Bellboy Tracking',
        path:'/bellboytracing'
      },
      loadChildren:()=>import('../../pages/bellboy-tracking/bellboy-tracking.module').then(m=>m.BellboyTrackingModule)
    },
    {
      path:'hiringactiontype',resolve:{data:ResolverService}, useHash: true,
      data:{
        text:'Hiring Action Types',
        path:'/hiringactiontype'
      },
      loadChildren:()=>import('../../pages/hiring-actions/hiring-actions.module').then(m=>m.HiringActionsModule)
    },
    {
      path:'myprofile/:id',resolve:{data:ResolverService},
      useHash: true,
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
      path:'advertisement' ,resolve:{data:ResolverService}, useHash: true,
      data:{
        text:'Advertisement',
        path:'/advertisement'
      },
      loadChildren:()=>import('../../pages/advertisement/advertisement.module').then(m=>m.AdvertisementModule)
    },
    {
      path:'notification',resolve:{data:ResolverService}, useHash: true,
      data:{
        text:'Notification',
        path:'/notification'
      },
      loadChildren:()=>import('../../pages/notification/notification.module').then(m=>m.NotificationModule)
    },
    {
      path:'complaints',resolve:{data:ResolverService}, useHash: true,
      data:{
        text:'Complaints',
        path:'/complains'
      },
      loadChildren:()=>import('../../pages/complains/complaints.module').then(m=>m.ComplainsModule)
    },
    {
      path:'versionControl',resolve:{data:ResolverService}, useHash: true,
      data:{
        text:'Version Control',
        path:'/versionControl'
      },
      loadChildren:()=>import('../../pages/version-control/version-control.module').then(m=>m.VersionControlModule)
    },
    {
      path: 'commissions',resolve:{data:ResolverService}, useHash: true ,
      data: {
        text: 'Commissions',
        path:'/commissions'
      },
      loadChildren:()=>import('../../pages/commissions/commissions.module').then(m=>m.CommissionsModule)
    }
  ]