export interface VersionList{
    "version": {
        "description": string,
        "title": string,
        "version": string,
        "active": false,
        "_id": string,
        "addedBy": {
            name:string
        },
        "created_at": string,
        "updated_at": string
    }[]
}