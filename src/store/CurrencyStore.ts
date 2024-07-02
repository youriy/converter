import {makeAutoObservable} from "mobx";
import {Currency, getExchangeRates} from "../api/Api";
import {fromPromise, IPromiseBasedObservable} from "mobx-utils";

class CurrencyStore {
    currencies?: IPromiseBasedObservable<Currency[]>

    constructor() {
        makeAutoObservable(this);
    }

    getCurrenciesAction = () => {
        this.currencies = fromPromise(getExchangeRates());
    }
}

export default new CurrencyStore();