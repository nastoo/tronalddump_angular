export interface Targets {

    count:number,
    total:number,
    _embedded: {
        quotes:Citation[];
    }

}

export interface Citation{
    value:string;
}