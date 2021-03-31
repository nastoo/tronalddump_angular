export interface Authors {
    total:number,
    _embedded: {
        tag: Tag[]
    }
}

export interface Tag {
    value:string
}
