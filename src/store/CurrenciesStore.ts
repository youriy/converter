import {makeAutoObservable} from "mobx";
import {getLocalStorage, setLocalStorage} from "../core/Helper";

class CurrenciesStore {
    defaultCurrencies: string[] = ['USD', 'EUR'];
    newCurrencies: string[] = [];
    currencyKey: string = 'currency_storage';

    constructor() {
        makeAutoObservable(this);

        let save = getLocalStorage(this.currencyKey);

        if (save) {
            this.newCurrencies = save;
        }
    }

    getAllAction = () => [...this.defaultCurrencies, ...this.newCurrencies];

    saveAction = (code: string) => {
        if (!this.getAllAction().includes(code)) {
            this.newCurrencies.push(code);
            setLocalStorage(this.newCurrencies, this.currencyKey);
        }
    }

    deleteAction = (code: string) => {
        this.newCurrencies = this.newCurrencies.filter(it => it !== code);
        setLocalStorage(this.newCurrencies, this.currencyKey);
    }
}

export default new CurrenciesStore();