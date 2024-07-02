import {makeAutoObservable} from "mobx";
import {Currency} from "../api/Api";

class ItemStore {
    currency: Currency;
    num: number = 0;
    result: number = 0;

    constructor(currency: Currency) {
        makeAutoObservable(this);
        this.currency = currency;
    }

    actionCalculation = (num: number) => {
        this.num = num;
        this.result = num / this.currency.Value * this.currency.Nominal;
    }
}

export default ItemStore;