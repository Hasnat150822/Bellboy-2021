export interface Notific{
    notifications:{
        _id: string,
        imageUrl: {
            exists: boolean,
            value: string
        },
        title: string,
        body: string,
        customerCount: number,
        admin:{
            _id:string,
            name:string
        }
    }[],
    notificationCount:number
}