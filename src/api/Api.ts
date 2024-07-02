import axios from "axios";

export type Currency = {
    ID: string,
    NumCode: string,
    CharCode: string,
    Nominal: number,
    Name: string,
    Value: number,
    Previous: number
}

export const getExchangeRates = async () => Object.values((await axios.get('https://www.cbr-xml-daily.ru/daily_json.js')).data.Valute) as Currency[]