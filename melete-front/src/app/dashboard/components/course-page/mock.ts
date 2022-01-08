import { ICourseData } from "./interfase/course-data.interfase"

const courseData: ICourseData[] =[
    {
        "theme": "Что такое TypeScript",
        "video":"https://www.youtube.com/embed/aCPYhCwTqrk"
    },
    {
        "theme": "Компиляция",
        "video": "https://www.youtube.com/embed/IMAUTJbk9ns"
    },
    {
        "theme": "Переменные",
        "video": "https://www.youtube.com/embed/C5-A-RNX2zE"
    },
    {
        "theme": "Типы данных",
        "video": "https://www.youtube.com/embed/_FWSiM8pIz8"
    },
    {
        "theme": "Работа с типами данных",
        "video": "https://www.youtube.com/embed/6H2liQHFQWE"
    },
    {
        "theme": "Условия, циклы и обработка ошибок",
        "video": "https://www.youtube.com/embed/bJ_eEtRFRQQ"
    },
    {
        "theme": "Функции",
        "video": "https://www.youtube.com/embed/J20GFMyuNh0"
    },
    {
        "theme": "ООП",
        "video": "https://www.youtube.com/embed/6NzYzdzqnHU"
    },
    {
        "theme": "Классы",
        "video": "https://www.youtube.com/embed/OuKQsWiSRWs"
    },
    {
        "theme": "Сущность любой монетки",
        "description":`Oпишите класс валюты,
                он должен определять имя(name) валюты типа String, содержать количество(value) валюты типа Number,
                содержать количественный тип(unit), в котором исчисляется валюта типа String.
                Класс должен предоставлять информацию о типе валюты: Материальная, криптовалюта или металл-депозит`,
        "task":`export class Currency{}

                export enum CurrencyType{}`
    }
]



export default courseData;
