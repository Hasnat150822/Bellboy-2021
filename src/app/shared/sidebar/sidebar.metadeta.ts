<<<<<<< HEAD
export function sideBarData(permissions) {
=======
export function sideBarData() {
>>>>>>> webfix/bellboy-copy
    var bellboy:any = [];
    var reports:any = [];
    var vehicles:any = [];
    var routes:any = [];
    var media:any = [];
    var users:any = [];
    var charges:any = [];
    var transactions:any = [];
<<<<<<< HEAD
    var perm:[] = permissions;
=======
    var perm = JSON.parse(localStorage.getItem('Permissions'))
>>>>>>> webfix/bellboy-copy
    for (let i = 0; i < perm.length; i++) {
        switch (perm[i]) {
        case "Dashboard":
            routes[0] = {
            path:'/dashboard', title:'Dashboard', icon:'../../../assets/img/ico/home.png', class:'', submenu:[]
        }
            break;
            case "Hiring":
                routes[1] = {
<<<<<<< HEAD
                    path:'/hiring', title:'Hirings', icon:'../../../assets/img/ico/product.png', class:'', submenu:[]
=======
                    path:'/hiring', title:'Hiring Orders', icon:'../../../assets/img/ico/product.png', class:'', submenu:[]
>>>>>>> webfix/bellboy-copy
            }
            break;
            case "Customers":
                routes[2] = {
                path:'/customers', title:'Customers', icon:'../../../assets/img/ico/client.png', class:'', submenu:[]
            }
                break;
            case "User Management":
                users.push({
                    path:'/usermanage', title:'User Management', icon:'', class:'', submenu:[]
                });
                break;
            case "Roles Management":
                users.push({ 
                    path:'/rolemanage', title:'Roles Management', icon:'', class:'', submenu:[]
                })
                break;
            // case "Categories":
            //     routes[3] = {
            //       path:'/categories', title:'Categories', icon:'../../../assets/img/ico/category.png', class:'', submenu:[]
            //   }
            //     break;
            // case "Brands":
            //     routes[4] = {
            //       path:'/brands', title:'Brands', icon:'../../../assets/img/ico/brand.png', class:'', submenu:[]
            //   }
            //     break;
            // case "Products":
            //     routes[5] = {
            //       path:'/products', title:'Products', icon:'../../../assets/img/ico/cart.png', class:'', submenu:[]
            //   }
            //     break;
            case "Manage Bellboy":
                bellboy[0] = {
                    path:'/bellboy', title:'Bellboys', icon:'', class:'', submenu:[]
                }
                break;
            case "Bellboy Tracking":
                        bellboy[1] ={
                            path:'/bellboytracing', title:'Bellboy Tracking', icon:'', class:'', submenu:[]
                        }
                break
            case "Bellboy Types":
                bellboy.push({
                path:'/bellboyTypes', title:'Bellboy Types', icon:'', class:'', submenu:[]
                })
            break;
            case "Manage Vehicles":
                vehicles.push({
                    path:'/managevehicle', title:'Vehicles', icon:'', class:'', submenu:[]
                })
            break
            case "Manage Vehicles Type":
                vehicles.push({
                        path:'/managevehicletype', title:'Vehicles Type', icon:'', class:'', submenu:[]
                    })
            break;
            case "Manage Brand":
                vehicles.push({
                        path:'/managebrand', title:'Brand', icon:'', class:'', submenu:[]
                    })
            break;
            case "Manage Model":
                vehicles.push({
                        path:'/managemodel', title:'Model', icon:'', class:'', submenu:[]
                    })
            break;
<<<<<<< HEAD
            case "Wallet":
                transactions.push({
                    path:'', title:'Wallet', icon:'../../../assets/img/ico/SVG/wallet.svg', class:'has-sub', submenu:[{
                        path:'/wallet', title:"TopUp / WithDraw", icon:'', class:'', submenu:[]
                    },{
                        path:'/commissions/companyEarnings', title:"Company's Earning", icon:'', class:'', submenu:[]
                    }]
                })
            break;
            case "Commissions":
                transactions.push({
                        path:'/commissions/percentage', title:'Manage Percentage', icon:'', class:'', submenu:[]
                })
            break;
            case "Complaints":
                routes[5] = {
=======
            case "Commissions":
                transactions[1] = {
                    path:'', title:'Commissions', icon:'../../../assets/img/ico/commission.png', class:'has-sub', submenu:[{
                        path:'/commissions/percentage', title:'Manage Percentage', icon:'', class:'', submenu:[]
                    },{
                        path:'/commissions/companyEarnings', title:"Company's Earning", icon:'', class:'', submenu:[]
                    }]
                }
            break;
            case "Wallet":
                transactions[0]={
                    path:'/wallet', title:'Wallet', icon:'../../../assets/img/ico/SVG/wallet.svg', class:'', submenu:[]
                }
            break;
            case "Complaints":
                routes[4] = {
>>>>>>> webfix/bellboy-copy
                    path:'/complaints', title:'Customer Feedbacks', icon:'../../../assets/img/ico/telemarketing.png', class:'', submenu:[]
                }
                break;
            case "Rider":
                charges.push({
<<<<<<< HEAD
                    path:'/finance/hiringCharges', title:'Rides', icon:'', class:'', submenu:[]
=======
                    path:'/finance/hiringCharges', title:'Rider Charges', icon:'', class:'', submenu:[]
>>>>>>> webfix/bellboy-copy
                })
            break;
            case "Personal Assist":
                charges.push({
                    path:'/finance/paassist', title:'Personal Assist', icon:'', class:'', submenu:[]
                })
            break;
            case "B2B":
                charges.push({
                    path:'/finance/b2b', title:'B2B', icon:'', class:'', submenu:[]
                })
            break;
            case "Deliveries":
                charges.push({
                    path:'/finance/deliveryCharges', title:'Deliveries', icon:'', class:'', submenu:[]
                })
            break;
            case "Hiring Action Types":
<<<<<<< HEAD
                routes[12] = {
=======
                routes[11] = {
>>>>>>> webfix/bellboy-copy
                    path:'/hiringactiontype', title:'Action Types', icon:'../../../assets/img/ico/confused.png', class:'', submenu:[]
                    }
            break;
            // case "Assign Status":
            //     orders.push({
            //             path:'/assignstatus', title:'Assign Status', icon:'', class:'', submenu:[]
            //     })
            //     break;
            // case "Deliveries":
            //   orders.push({
            //         path:'/deliveries', title:'Deliveries', icon:'', class:'', submenu:[]
            //   })
            //     break;
            // case "Delivery Charges":
            //     finance.push({
            //       path:'/finance/deliveryCharges', title:'Delivery Charges', icon:'', class:'', submenu:[]
            //     })
            //   break
            case "Finance Reports":
                reports.push({
                        path:'/reports/financeReport', title:'Finance Reports', icon:'', class:'', submenu:[]
                    })
            break;
            case "Customer Reports":
                reports.push({
                        path:'/reports/customerReports', title:'Customer Reports', icon:'', class:'', submenu:[]
                    })
            break;
<<<<<<< HEAD
            case "Bellboy Reports":
                reports.push({
                        path:'/reports/bellboyReports', title:'Bellboy Reports', icon:'', class:'', submenu:[]
                    })
            break;
=======
>>>>>>> webfix/bellboy-copy
            case "Monitoring Reports":
                reports.push({
                    path:'/reports/monitoringReport', title:'Monitoring Reports', icon:'', class:'', submenu:[]
                })
                break;
<<<<<<< HEAD
            case "Hiring Reports":
                reports.push({
                    path:'/reports/hiringReports', title:'Hiring Reports', icon:'', class:'', submenu:[]
                })
                break;
            case "Advertisement":
                media.push({
                        path:'', title:'Banners', icon:'', class:'has-sub', submenu:[
=======
            case "Advertisement":
                media.push({
                        path:'', title:'Advertisement', icon:'', class:'has-sub', submenu:[
>>>>>>> webfix/bellboy-copy
                            {
                                path:'/advertisement/customer', title:'Customer', icon:'', class:'', submenu:[]
                            },
                            {
                                path:'/advertisement/bellboy', title:'Bellboy', icon:'', class:'', submenu:[]
                            }
                        ]
                    })
                break;
<<<<<<< HEAD
            case "Offers":
                media.push({
                    path:'', title:'Offers', icon:'', class:'has-sub', submenu:[
                        {
                            path:'/customerOffers', title:'Customer', icon:'', class:'', submenu:[]
                        },
                        {
                            path:'/bellboyOffers', title:'Bellboy', icon:'', class:'', submenu:[]
                        }
                    ]
                })
                break;
            case "Notification":
                media.push({
                        path:'', title:'Notification', icon:'', class:'has-sub', submenu:[{
                            path:'/notification?type=customer', title:'Customer', icon:'', class:'', submenu:[]
                        }, {
                            path:'/notification?type=bellboy', title:'Bellboy', icon:'', class:'', submenu:[]
                        }]
=======
            case "Notification":
                media.push({
                        path:'/notification', title:'Notification', icon:'', class:'', submenu:[]
>>>>>>> webfix/bellboy-copy
                    })
                break;
            default:
                break;
            case "Version Control":
<<<<<<< HEAD
                routes[11] = {
=======
                routes[10] = {
>>>>>>> webfix/bellboy-copy
                    path:'/versionControl', title:'Version Control', icon:'../../../assets/img/ico/SVG/version.svg', class:'', submenu:[]
                    }
            break;
        }
    }
    if(vehicles.length>0){
<<<<<<< HEAD
        routes[4] = {
            path:'', title:'Manage Vehicles', icon:'../../../assets/img/ico/SVG/rides.svg', class:'has-sub', submenu:vehicles
        }
=======
        bellboy.push({
            path:'', title:'Vehicles', icon:'', class:'has-sub', submenu:vehicles
        })
>>>>>>> webfix/bellboy-copy
    }  
    if(bellboy.length>0){
        routes[3] = {
            path:'', title:'Bellboy', icon:'../../../assets/img/ico/BB-PNG.png', class:'has-sub', submenu:bellboy
        }
    }
    if(charges.length>0){
<<<<<<< HEAD
        routes[10] = {
=======
        routes[9] = {
>>>>>>> webfix/bellboy-copy
            path:'', title:'Our Charges', icon:'../../../assets/img/ico/money.png', class:'has-sub', submenu:charges
        } 
    }
    // if(orders.length>0){
    //     routes[9] = {
    //         path:'', title:'Orders', icon:'../../../assets/img/ico/product.png', class:'has-sub', submenu:orders
    //     }
    // }
    if(users.length>0){
<<<<<<< HEAD
        routes[8] = {
=======
        routes[7] = {
>>>>>>> webfix/bellboy-copy
            path:'', title:'Bellboy Staff', icon:'../../../assets/img/ico/users.png', class:'has-sub', submenu:users
        }
    }
    if(media.length>0){
<<<<<<< HEAD
        routes[9] = {
=======
        routes[8] = {
>>>>>>> webfix/bellboy-copy
            path:'', title:'Media', icon:'../../../assets/img/ico/campaign.png', class:'has-sub', submenu:media
        }
    }
    if(reports.length>0){
<<<<<<< HEAD
        routes[6] = {
=======
        routes[5] = {
>>>>>>> webfix/bellboy-copy
            path:'', title:'Reports', icon:'../../../assets/img/ico/reports.png', class:'has-sub', submenu:reports
        }
    }
    if(transactions.length>0){
<<<<<<< HEAD
        routes[7] = {
=======
        routes[6] = {
>>>>>>> webfix/bellboy-copy
            path:'', title:'Transactions', icon:'../../../assets/img/ico/SVG/transaction.svg', class:'has-sub', submenu:transactions
        }
    }
    return routes;
}