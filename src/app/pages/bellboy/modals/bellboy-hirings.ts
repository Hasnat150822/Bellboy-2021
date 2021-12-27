export interface BellboyHirings {
<<<<<<< HEAD
    success: boolean,
    code: number,
    data: {
        totalHiringsCountCompleted: number,
        totalHiringsCountCanclled: number,
        totalHiringsCount: number,
            hirings:
                {
                    hours: number,
                    pricePerHour: number,
                    amount: number,
                    status: number,
                    totalActions: number,
                    is_completed: boolean,
                    cancellation_reason: string,
                    closing_reason: string,
                    cancelled_by: number,
                    for_verification: boolean,
                    hasFeedback: boolean,
                    _id: string,
                    hiring_id: string,
                    customer: {
                        avatar: {
                            exists: boolean,
                            value: string
                        },
                        name: string,
                        _id: string,
                        mobile: string
                    },
                    bellboyType: {
                        _id: string,
                        title: string,
                        icon: string
                    },
                    created_at: string,
                    start_time: string,
                    end_time: string,
                    security_code: string
                }[]
    },
    message: string
}

export interface NewBellboy {
    bellboyType:string,
    name:string,
    email:string,
    mobile:string,
    day:number,
    month:number,
    year:number,
    nic_front_image:File,
    nic_back_image:File,
    nic_value:string,
    nic_expiry_date:string,
    drivinglicense_value:string,
    drivinglicense_front_image:File,
    drivinglicense_back_image:File,
    drivinglicense_expiry_date:string,
    charactercertificate_image:File,
    charactercertificate_date_of_issue:string,
    charactercertificate_no:string,
    avatar:File
=======
    "success": boolean,
    "code": number,
    "data": {
        "totalHiringsCountCompleted": number,
        "totalHiringsCountCanclled": number,
        "totalHiringsCount": number,
            "hirings":
                {
                    "hours": number,
                    "pricePerHour": number,
                    "amount": number,
                    "status": number,
                    "totalActions": number,
                    "is_completed": boolean,
                    "cancellation_reason": "",
                    "closing_reason": "",
                    "cancelled_by": number,
                    "for_verification": boolean,
                    "hasFeedback": boolean,
                    "_id": string,
                    "hiring_id": string,
                    "customer": {
                        "avatar": {
                            "exists": boolean,
                            "value": string
                        },
                        "name": string,
                        "_id": string,
                        "mobile": string
                    },
                    "bellboyType": {
                        "_id": string,
                        "title": string,
                        "icon": string
                    },
                    "created_at": string,
                    "start_time": string,
                    "end_time": string,
                    "security_code": string
                }[]
    },
    "message": string
>>>>>>> webfix/bellboy-copy
}