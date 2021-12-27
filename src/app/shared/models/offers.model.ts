export interface OfferModel {
    "imageUrl": {
        "value": string
    },
    "title":string,
    "body":string,
    "code":string,
    "isPercent": boolean,
    "isLimited": boolean,
    "max": number,
    "isActive": boolean,
    "bellboyTypes": 
    {
        "title": string,
        "_id":string
    }[],
    "amount": number,
    "expiryDate": string,
    "admin": {
        "name": number,
    },
    "created_at": string
}