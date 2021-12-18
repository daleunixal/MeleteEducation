import { getModelForClass, ReturnModelType } from '@typegoose/typegoose';
import { Observable } from 'rxjs';
import dayjs from 'dayjs';
import hash from 'hash-it';
import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export abstract class MongoInteractive<T> {
    /**
     * Сохраняем модель Mongoose в MongoDB
     *
     * @param throwOnExist - Проверять на существоание?
     *
     * @returns Observable<boolean>
     *     Если true - сохранение успешно
     *     Если false - запись идентична прошлой версии
     */
    public abstract saveModel(throwOnExist: boolean): Observable<boolean>;

    /**
     * Получить хэш объекта
     *
     * @returns number
     *      Хэш сумма объекта
     */
    public getHashCode(): number{
        return hash(this);
    }


    /**
     * Генерация ID для MongoDB
     *
     * @private
     * @returns string _ID
     */
    protected static generateObjectID(): ObjectId {
        const timestamp = (dayjs().unix()).toString(16);

        return new ObjectId(timestamp + 'x'.repeat(16).replace(/[x]/g, () =>
            (Math.random() * 16 | 0).toString(16)
        ).toLowerCase());
    };
}

