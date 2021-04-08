export interface BellboyHirings {
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
}