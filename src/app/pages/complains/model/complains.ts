export interface Complaint{
    _id:string,
    subject:string,
    email:string,
    message:string,
    customer:{
        name:string,
        email:string,
        _id:string,
        mobile:string
    },
    created_at:string,
    updated_at:string,
    __v:number
}