import {observable, action, runInAction, computed} from 'mobx';
import fetch from 'isomorphic-fetch';
import moment from 'moment';
const API = process.env.REACT_APP_API_URL;
const DATE_FORMAT = 'YYYY-MM-DD';

export default class DashboardStore {
    @observable dateRange;
    @observable upsells;
    @observable products;
    @observable batteries;
    @observable providers;
    @observable customers;
    @observable stores;

    minYear = 2017;

    sessionStore;

    constructor(sessionStore, dateRange = {month: null, year: null}) {
        if (!sessionStore) {
            throw new Error('DashboardStore needs sessionStore as dependency');
        }
        this.sessionStore = sessionStore;
        const {month, year} = dateRange;
        this.setDateRange(month, year);
    }

    isDateRangeValid(month, year) {
        if (year !== undefined && (isNaN(year) || year < this.minYear)) {
            return false;
        }

        return (!isNaN(month)) && month > 0 && month <= 12;
    }

    getDateRange() {
        const start = moment([this.dateRange.year, this.dateRange.month - 1, 1])
            .format(DATE_FORMAT);

        const end = moment(start, DATE_FORMAT)
            .endOf('month')
            .format(DATE_FORMAT);

        return {
            start,
            end,
        };
    }

    @computed get getYearValidRange() {
        const currentYear = new Date().getFullYear();
        const diff = (currentYear - this.minYear) + 1;

        if (diff === 1) {
            return [this.minYear];
        }

        return Array.apply(...Array(diff))
            .map((_, index) => {
                return this.minYear + index;
            });
    }

    @computed get amountOfUpsells() {
        if (!this.upsells || !this.upsells.data) {
            return null;
        }

        return this.upsells.data.reduce((sum, {value}) => {
            return sum + value;
        }, 0);
    }

    @computed get amountOfProducts() {
        if (!this.products || !this.products.data) {
            return null;
        }

        return this.products.data.reduce((sum, {value}) => {
            return sum + value;
        }, 0);
    }

    @computed get amountOfBatteries() {
        if (!this.batteries || !this.batteries.data) {
            return null;
        }

        return this.batteries.data.reduce((sum, {value}) => {
            return sum + value;
        }, 0);
    }

    @action setDateRange(month, year) {
        const today = new Date();

        if (!year) {
            year = today.getFullYear();
        }

        if (this.isDateRangeValid(month, year)) {
            this.dateRange = {
                month,
                year,
            };
            return;
        }

        const todayMonth = today.getMonth() + 1;
        this.dateRange = {
            month: todayMonth,
            year: today.getFullYear(),
        };
    }

    @action resetUpsell() {
        this.upsells = {
            data: [],
            loading: true,
            error: undefined,
        };
    }

    @action resetProducts() {
        this.products = {
            data: [],
            loading: true,
            error: undefined,
        };
    }

    @action resetBatteries() {
        this.batteries = {
            data: [],
            loading: true,
            error: undefined,
        };
    }

    @action resetProviders() {
        this.providers = {
            data: null,
            loading: true,
            error: undefined,
        };
    }

    @action resetCustomers() {
        this.customers = {
            data: null,
            loading: true,
            error: undefined,
        };
    }

    @action resetStores() {
        this.stores = {
            data: null,
            loading: true,
            error: undefined,
        };
    }

    @action async fetchUpsells() {
        this.resetUpsell();

        const token = await this.sessionStore.getToken();

        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const {start, end} = this.getDateRange();

        const query = `&q=created_at>=d:${start}&q=created_at<=d:${end}`;
        const response = await fetch(`${API}/admin/payments?q=type=upsell${query}`, {headers});

        const payload = await response.json();

        runInAction('fetchUpsells', () => {
            if (response.status === 200) {
                return this.upsells = {
                    loading: false,
                    data: payload,
                    error: undefined,
                };
            }

            this.upsells = {
                loading: false,
                data: [],
                error: payload,
            };
        });
    }

    @action async fetchProducts() {
        this.resetProducts();

        const token = await this.sessionStore.getToken();

        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const {start, end} = this.getDateRange();

        const query = `&q=created_at>=d:${start}&q=created_at<=d:${end}`;
        const response = await fetch(`${API}/admin/payments?q=type=product${query}`, {headers});

        const payload = await response.json();

        runInAction('fetchProducts', () => {
            if (response.status === 200) {
                return this.products = {
                    loading: false,
                    data: payload,
                    error: undefined,
                };
            }

            this.products = {
                loading: false,
                data: [],
                error: payload,
            };
        });
    }

    @action async fetchBatteries() {
        this.resetBatteries();

        const token = await this.sessionStore.getToken();

        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const {start, end} = this.getDateRange();

        const query = `&q=created_at>=d:${start}&q=created_at<=d:${end}`;
        const response = await fetch(`${API}/admin/payments?q=type=battery${query}`, {headers});

        const payload = await response.json();

        runInAction('fetchBatteries', () => {
            if (response.status === 200) {
                return this.batteries = {
                    loading: false,
                    data: payload,
                    error: undefined,
                };
            }

            this.batteries = {
                loading: false,
                data: [],
                error: payload,
            };
        });
    }

    @action async fetchProviders() {
        this.resetProviders();

        const token = await this.sessionStore.getToken();

        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(`${API}/admin/providers`, {headers});

        const payload = await response.json();

        runInAction('fetchProviders', () => {
            if (response.status === 200) {
                return this.providers = {
                    loading: false,
                    data: parseFloat(response.headers.get('x-query-count')),
                    error: undefined,
                };
            }

            this.providers = {
                loading: false,
                data: null,
                error: payload,
            };
        });
    }

    @action async fetchCustomers() {
        this.resetCustomers();

        const token = await this.sessionStore.getToken();

        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(`${API}/admin/customers`, {headers});

        const payload = await response.json();

        runInAction('fetchCustomers', () => {
            if (response.status === 200) {
                return this.customers = {
                    loading: false,
                    data: parseFloat(response.headers.get('x-query-count')),
                    error: undefined,
                };
            }

            this.customers = {
                loading: false,
                data: null,
                error: payload,
            };
        });
    }

    @action async fetchStores() {
        this.resetStores();

        const token = await this.sessionStore.getToken();

        const headers = {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
        };

        const response = await fetch(`${API}/admin/stores`, {headers});

        const payload = await response.json();

        runInAction('fetchStores', () => {
            if (response.status === 200) {
                return this.stores = {
                    loading: false,
                    data: parseFloat(response.headers.get('x-query-count')),
                    error: undefined,
                };
            }

            this.stores = {
                loading: false,
                data: null,
                error: payload,
            };
        });
    }

    @action async initializeStore() {
        this.fetchUpsells();
        this.fetchProducts();
        this.fetchBatteries();
        this.fetchProviders();
        this.fetchCustomers();
        this.fetchStores();
    }

    @action async fetch() {
        this.fetchUpsells();
        this.fetchProducts();
        this.fetchBatteries();
    }
}
