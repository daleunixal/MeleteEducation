import { MongoClient } from "mongodb";
import { MONGO_HOST_URI, mongoClientOptions } from '../../../configuration/mogoOptions';
import { catchError, from, map, Observable, of } from 'rxjs';
import { mongoose } from '@typegoose/typegoose';

export class MongoDbConnector{
    private static _mngCli: MongoClient

    constructor() {
        if (MongoDbConnector._mngCli){
            return
        }
        MongoDbConnector._mngCli = new MongoClient(MONGO_HOST_URI)
    }

    public connect(): Observable<boolean>{
        return from(
            mongoose.connect(MONGO_HOST_URI)
        ).pipe(
            map((logInfo) => {
                console.log('[Lilith] Success connection to MeletDB')
                return true;
            }),
            catchError((val) => {
                console.error(val)
                return of(false)
            })
        )
    }

    public destroyConnection(): void{
        MongoDbConnector._mngCli.close()
    }
}
