export const setLocalStorage = (value: any, key: string) => localStorage.setItem(key, JSON.stringify(value));
export const getLocalStorage = (key: string) => JSON.parse(localStorage.getItem(key) || '""');

export const currencyFormat = (num: number, code: string) => {
    const format = new Intl.NumberFormat("ru", {
        style: "currency",
        currency: code,
        minimumFractionDigits: 3
    });

    return format.format(num);
}