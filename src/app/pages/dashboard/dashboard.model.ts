export interface dashboard{
    graph:{
        hiringData:{
        count: number,
        formattedDate:string,
        date: {
            day: number,
            month: number,
            year: number
        }
        }[],
        customerData:{
            count:number,
            formattedDate:string,
            date:{
                day:number,
                month:number,
                year:number
            }
        }[],
        bellboyData:{
            count:number,
            formattedDate:number,
            date:{
                day:number,
                month:number,
                year:number
            }
        }[]
    },
    total:{
        totalCurrentDayHirings:{
        count: number,
        formattedDate:string,
        date: {
            day: number,
            month: number,
            year: number
        }
        }[],
        totalCurrentDayCustomers:{
        count: number,
        formattedDate:string,
        date: {
            day: number,
            month: number,
            year: number
        }
        }[],
        totalCurrentDayBellBoys:{
        count: number,
        formattedDate:string,
        date: {
            day: number,
            month: number,
            year: number
        }
        }[],   
        totalPendingHirings:{
            count: number,
            formattedDate:string,
            date: {
                day: number,
                month: number,
                year: number
            }
        }[],  
        totalAssignedHirings:{
            count: number,
            formattedDate:string,
            date: {
                day: number,
                month: number,
                year: number
            }
        }[],
        totalInProgressHirings:{
            count: number,
            formattedDate:string,
            date: {
                day: number,
                month: number,
                year: number
            }
        }[],
        totalCompletedHirings:{
            count: number,
            formattedDate:string,
            date: {
                day: number,
                month: number,
                year: number
            }
        }[],
        totalCancelledHirings:{
            count: number,
            formattedDate:string,
            date: {
                day: number,
                month: number,
                year: number
            }
        }[]
    },
    totalWithDetail:{
        currentDayHirings:{
            _id:string,
            location:{
                geolocation:{
                    latitude:number,
                    longitude:number
                },
                address:string,
                near_by:string
            },
            charges:{
                fuelCharges: {
                    calculated: number,
                    defined: number
                },
                serviceCharges: {
                    calculated: number,
                    defined: number
                },
                timeCosting: {
                    calculated: number,
                    defined: number
                },
                waitingCharges: {
                    calculated: number,
                    defined: number
                },
                totalDistance: number,
                totalTime: number,
                totalBill: number,
                paidByWallet: number
            },
            hours:number,
            pricePerHour:number,
            amount:number,
            status:number,
            is_completed: boolean,
            cancellation_reason: string,
            cancelled_by: number,
            for_verification: boolean,
            hiring_id: string,
            customer: {
                avatar: {
                    exists: boolean,
                    value: string
                },
                name: string,
                email: string,
                _id: string,
                mobile: string
            },
            actions:{
                voice_note: {
                    value: string,
                    exists: boolean
                    },
                    location: {
                        geolocation: {
                            latitude: 31.43119839300527,
                            longitude: 74.26435813307762
                        },
                        address: string,
                        near_by: string
                    },
                    instruction: string,
                    status: boolean,
                    bill_images: string[],
                    images: string[],
                    _id: string,
                    actionType: string
            }[],
            bellboyType:string,
            created_at:string,
            updated_at:string,
            bellboy: {
                avatar: {
                    exists: boolean,
                    value: string
                },
                name: string,
                email: string,
                _id: string,
                mobile: string
            },
        }[],
        currentDayCustomers:{
            _id:string,
            avatar:{
                exists:string,
                value:string
            },
            name:string,
            email:string,
            gender:string,
            fcm_token:string,
            auth_token:string,
            referral_code:string,
            isReferred:boolean,
            is_logged:boolean,
            gmail_id:string,
            facebook_id:string,
            status:boolean,
            wallet:number,
            mobile:string,
            addresses:string[],
            created_at:string,
            updated_at:string
        }[],
        currentDayBellBoys:{
            _id:string,
            avatar:{
                exists:string,
                value:string
            },
            name:string,
            email:string,
            gender:string,
            fcm_token:string,
            auth_token:string,
            referral_code:string,
            isReferred:boolean,
            is_logged:boolean,
            gmail_id:string,
            facebook_id:string,
            status:boolean,
            wallet:number,
            mobile:string,
            addresses:string[],
            created_at:string,
            updated_at:string
        }[]
    }
}