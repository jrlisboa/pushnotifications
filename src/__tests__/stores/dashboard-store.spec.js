import nock from 'nock';
import { isObservableArray, toJS } from "mobx";
const URL = 'https://porto-faz-mais.appspot.com';

it('should create a new DashboardStore instance', () => {
    global.localStorage = {
        setItem: () => {},
        getItem: () => {
            return null;
        }
    };
    const DashboardStore = require('../../stores/dashboard').default;
    const dashboard = new DashboardStore({});
    expect(dashboard).toBeInstanceOf(DashboardStore);
});


describe('isDateRangeValid', () => {
    it('when only pass month date should return true if its valid', () => {
        global.localStorage = {
            setItem: () => {},
            getItem: () => {
                return null;
            }
        };
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        const expectCases = [
            { value: -1, result: false },
            { value: 0, result: false },
            { value: 1, result: true },
            { value: 5, result: true },
            { value: 12, result: true },
            { value: 13, result: false },
        ];

        expectCases.forEach(({ value, result }) => {
            expect(dashboard.isDateRangeValid(value)).toBe(result);
        });
    });

    it('when pass an valid month but an invalid year date should return false', () => {
        global.localStorage = {
            setItem: () => {},
            getItem: () => {
                return null;
            }
        };
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        const expectCases = [
            { month: 1, year: 2016 },
            { month: 5, year: 2016 },
            { month: 12, year: 2016 },
        ];

        expectCases.forEach(({ month, year }) => {
            expect(dashboard.isDateRangeValid(month, year)).toBe(false);
        });
    });

    it('when pass an valid month and a valid year date should return true', () => {
        global.localStorage = {
            setItem: () => {},
            getItem: () => {
                return null;
            }
        };
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        const expectCases = [
            { month: 1, year: 2017 },
            { month: 5, year: 2017 },
            { month: 12, year: 2017 },
        ];

        expectCases.forEach(({ month, year }) => {
            expect(dashboard.isDateRangeValid(month, year)).toBe(true);
        });
    });
});

describe('setDateRange', () => {
    it('should set the date range to the current month and year when pass an invalid month', () => {
        global.localStorage = {
            setItem: () => {},
            getItem: () => {
                return null;
            }
        };
        const DashboardStore = require('../../stores/dashboard').default;
        const expectCases = [ -1, 0, 13 ];
        const today = new Date();
        const expectRange = {
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        };

        expectCases.forEach((value) => {
            const dashboard = new DashboardStore({});
            dashboard.setDateRange(value);
            expect(dashboard.dateRange).toEqual(expectRange);
        });
    });

    it('should set the date range to the current month and year when pass an invalid year', () => {
        global.localStorage = {
            setItem: () => {},
            getItem: () => {
                return null;
            }
        };
        const DashboardStore = require('../../stores/dashboard').default;
        const expectCases = [ 2015, 2016 ];
        const today = new Date();
        const expectRange = {
            month: today.getMonth() + 1,
            year: today.getFullYear(),
        };

        expectCases.forEach((value) => {
            const dashboard = new DashboardStore({});
            dashboard.setDateRange(1, value);
            expect(dashboard.dateRange).toEqual(expectRange);
        });
    });

    it('should set the month of date range to the argument if it is valid and the year to the current year if dont pass the year argument', () => {
        global.localStorage = {
            setItem: () => {},
            getItem: () => {
                return null;
            }
        };
        const DashboardStore = require('../../stores/dashboard').default;

        const expectCases = [ 1, 5, 12 ];
        const today = new Date();

        expectCases.forEach((month) => {
            const dashboard = new DashboardStore({});
            dashboard.setDateRange(month);
            expect(dashboard.dateRange).toEqual({
                month,
                year: today.getFullYear(),
            });
        });
    });

    it('should set date range if pass an valid month and year', () => {
        global.localStorage = {
            setItem: () => {},
            getItem: () => {
                return null;
            }
        };
        const DashboardStore = require('../../stores/dashboard').default;

        const expectCases = [
            { month: 1, year: 2017 },
            { month: 12, year: 2018 },
            { month: 5, year: 2017 },
        ];

        expectCases.forEach(({ month, year }) => {
            const dashboard = new DashboardStore({});
            dashboard.setDateRange(month, year);
            expect(dashboard.dateRange).toEqual({
                month,
                year,
            });
        });
    });
});

describe('getDateRange', () => {
    it('should return an valid date range', () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        const expectCases = [
            { month: 1, year: 2017, start: '2017-01-01', end: '2017-01-31' },
            { month: 4, year: 2017, start: '2017-04-01', end: '2017-04-30' },
            { month: 12, year: 2017, start: '2017-12-01', end: '2017-12-31' },
            { month: 12, year: undefined, start: '2017-12-01', end: '2017-12-31' },
            { month: 12, year: 2018, start: '2018-12-01', end: '2018-12-31' },
            { month: 2, year: 2020, start: '2020-02-01', end: '2020-02-29' },
        ];

        expectCases.forEach(({ month, year, start, end }) => {
            dashboard.setDateRange(month, year);

            expect(dashboard.getDateRange())
                .toEqual({
                    start,
                    end,
                });
        });
    });
});

describe('resets actions', () => {
    it('should reset upsell', () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        dashboard.resetUpsell();
        const {
            loading,
            data,
            error,
        } = dashboard.upsells;

        expect(loading).toBe(true);
        expect(isObservableArray(data)).toBe(true);
        expect(toJS(data)).toEqual([]);
        expect(error).toBeUndefined();
    });

    it('should reset products', () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        dashboard.resetProducts();
        const {
            loading,
            data,
            error,
        } = dashboard.products;

        expect(loading).toBe(true);
        expect(isObservableArray(data)).toBe(true);
        expect(toJS(data)).toEqual([]);
        expect(error).toBeUndefined();
    });

    it('should reset batteries', () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        dashboard.resetBatteries();
        const {
            loading,
            data,
            error,
        } = dashboard.batteries;

        expect(loading).toBe(true);
        expect(isObservableArray(data)).toBe(true);
        expect(toJS(data)).toEqual([]);
        expect(error).toBeUndefined();
    });

    it('should reset providers', () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        dashboard.resetProviders();
        const {
            loading,
            data,
            error,
        } = dashboard.providers;

        expect(loading).toBe(true);
        expect(toJS(data)).toBeNull();
        expect(error).toBeUndefined();
    });

    it('should reset customers', () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        dashboard.resetCustomers();
        const {
            loading,
            data,
            error,
        } = dashboard.customers;

        expect(loading).toBe(true);
        expect(toJS(data)).toBeNull();
        expect(error).toBeUndefined();
    });

    it('should reset stores', () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({});

        dashboard.resetStores();
        const {
            loading,
            data,
            error,
        } = dashboard.stores;

        expect(loading).toBe(true);
        expect(toJS(data)).toBeNull();
        expect(error).toBeUndefined();
    });
});

describe('fetchUpsells', () => {
    describe('when api returns 200', () => {
        beforeEach(() => {
            nock(URL)
            .get('/admin/payments')
            .query({
                q: [
                    'type=upsell',
                    'created_at>=d:2017-09-01',
                    'created_at<=d:2017-09-30'
                ],
            })
            .reply(200, [{
                teste: 'teste'
            }]);
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill upsell observable with data when fetch data successfully', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            }, { month: 9, year: 2017 });

            await dashboard.fetchUpsells();

            const {
                loading,
                data,
                error,
            } = dashboard.upsells;

            expect(loading).toBe(false);
            expect(isObservableArray(data)).toBe(true);
            expect(toJS(data)).toEqual([{
                teste: 'teste'
            }]);
            expect(error).toBeUndefined();
        });
    });

    describe('when api returns 400', () => {
        beforeEach(() => {
            nock(URL)
            .get('/admin/payments')
            .query({
                q: [
                    'type=upsell',
                    'created_at>=d:2017-09-01',
                    'created_at<=d:2017-09-30'
                ],
            })
            .reply(400, {
              message: 'error message'
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill upsell observable with the error message', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            }, { month: 9, year: 2017 });

            await dashboard.fetchUpsells();

            const {
                loading,
                data,
                error,
            } = dashboard.upsells;

            expect(loading).toBe(false);
            expect(isObservableArray(data)).toBe(true);
            expect(toJS(data)).toEqual([]);
            expect(toJS(error)).toEqual({
                message: 'error message',
            });
        });
    });
});

describe('fetchProducts', () => {
    describe('when api returns 200', () => {
        beforeEach(() => {
            nock(URL)
            .get('/admin/payments')
            .query({
                q: [
                    'type=product',
                    'created_at>=d:2017-09-01',
                    'created_at<=d:2017-09-30'
                ],
            })
            .reply(200, [{
                teste: 'teste'
            }]);
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill products observable with data when fetch data successfully', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            }, { month: 9, year: 2017 });

            await dashboard.fetchProducts();

            const {
                loading,
                data,
                error,
            } = dashboard.products;

            expect(loading).toBe(false);
            expect(isObservableArray(data)).toBe(true);
            expect(toJS(data)).toEqual([{
                teste: 'teste'
            }]);
            expect(error).toBeUndefined();
        });
    });

    describe('when api returns 400', () => {
        beforeEach(() => {
            nock(URL)
              .get('/admin/payments')
              .query({
                  q: [
                      'type=product',
                      'created_at>=d:2017-09-01',
                      'created_at<=d:2017-09-30'
                  ],
              })
              .reply(400, {
                 message: 'error message'
              });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill products observable with the error message', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            }, { month: 9, year: 2017 });

            await dashboard.fetchProducts();

            const {
                loading,
                data,
                error,
            } = dashboard.products;

            expect(loading).toBe(false);
            expect(isObservableArray(data)).toBe(true);
            expect(toJS(data)).toEqual([]);
            expect(toJS(error)).toEqual({
                message: 'error message',
            });
        });
    });
});

describe('fetchBatteries', () => {
    describe('when api returns 200', () => {
        beforeEach(() => {
            nock(URL)
            .get('/admin/payments')
            .query({
                q: [
                    'type=battery',
                    'created_at>=d:2017-09-01',
                    'created_at<=d:2017-09-30'
                ],
            })
            .reply(200, [{
                teste: 'teste'
            }]);
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill batteries observable with data when fetch data successfully', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            }, { month: 9, year: 2017 });

            await dashboard.fetchBatteries();

            const {
                loading,
                data,
                error,
            } = dashboard.batteries;

            expect(loading).toBe(false);
            expect(isObservableArray(data)).toBe(true);
            expect(toJS(data)).toEqual([{
                teste: 'teste'
            }]);
            expect(error).toBeUndefined();
        });
    });

    describe('when api returns 400', () => {
        beforeEach(() => {
            nock(URL)
            .get('/admin/payments')
            .query({
                q: [
                    'type=battery',
                    'created_at>=d:2017-09-01',
                    'created_at<=d:2017-09-30'
                ],
            })
            .reply(400, {
              message: 'error message'
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill batteries observable with the error message', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            }, { month: 9, year: 2017 });

            await dashboard.fetchBatteries();

            const {
                loading,
                data,
                error,
            } = dashboard.batteries;

            expect(loading).toBe(false);
            expect(isObservableArray(data)).toBe(true);
            expect(toJS(data)).toEqual([]);
            expect(toJS(error)).toEqual({
                message: 'error message',
            });
        });
    });
});

describe('fetchProviders', () => {
    describe('when api returns 200', () => {
        beforeEach(() => {
            nock(URL)
            .get(/\/admin\/providers/)
            .reply(200, [], {
                'x-query-count': 100,
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill providers observable with data when fetch data successfully', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            });

            await dashboard.fetchProviders();

            const {
                loading,
                data,
                error,
            } = dashboard.providers;

            expect(loading).toBe(false);
            expect(toJS(data)).toEqual(100);
            expect(error).toBeUndefined();
        });
    });

    describe('when api returns 400', () => {
        beforeEach(() => {
            nock(URL)
            .get(/\/admin\/providers/)
            .reply(400, {
              message: 'error message'
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill providers observable with the error message', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            });

            await dashboard.fetchProviders();

            const {
                loading,
                data,
                error,
            } = dashboard.providers;

            expect(loading).toBe(false);
            expect(toJS(data)).toEqual(null);
            expect(toJS(error)).toEqual({
                message: 'error message',
            });
        });
    });
});

describe('fetchCustomers', () => {
    describe('when api returns 200', () => {
        beforeEach(() => {
            nock(URL)
            .get(/\/admin\/customers/)
            .reply(200, [], {
                'x-query-count': 100,
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill customers observable with data when fetch data successfully', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            });

            await dashboard.fetchCustomers();

            const {
                loading,
                data,
                error,
            } = dashboard.customers;

            expect(loading).toBe(false);
            expect(toJS(data)).toEqual(100);
            expect(error).toBeUndefined();
        });
    });

    describe('when api returns 400', () => {
        beforeEach(() => {
            nock(URL)
            .get(/\/admin\/customers/)
            .reply(400, {
              message: 'error message'
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill customers observable with the error message', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            });

            await dashboard.fetchCustomers();

            const {
                loading,
                data,
                error,
            } = dashboard.customers;

            expect(loading).toBe(false);
            expect(toJS(data)).toEqual(null);
            expect(toJS(error)).toEqual({
                message: 'error message',
            });
        });
    });
});

describe('fetchStores', () => {
    describe('when api returns 200', () => {
        beforeEach(() => {
            nock(URL)
            .get(/\/admin\/stores/)
            .reply(200, [], {
                'x-query-count': 100,
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill stores observable with data when fetch data successfully', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            });

            await dashboard.fetchStores();

            const {
                loading,
                data,
                error,
            } = dashboard.stores;

            expect(loading).toBe(false);
            expect(toJS(data)).toEqual(100);
            expect(error).toBeUndefined();
        });
    });

    describe('when api returns 400', () => {
        beforeEach(() => {
            nock(URL)
            .get(/\/admin\/stores/)
            .reply(400, {
              message: 'error message'
            });
        });

        afterEach(() => {
            nock.cleanAll();
        });

        it('should fulfill stores observable with the error message', async () => {
            const DashboardStore = require('../../stores/dashboard').default;
            const dashboard = new DashboardStore({
                getToken: () => {
                    return 'token';
                },
            });

            await dashboard.fetchStores();

            const {
                loading,
                data,
                error,
            } = dashboard.stores;

            expect(loading).toBe(false);
            expect(toJS(data)).toEqual(null);
            expect(toJS(error)).toEqual({
                message: 'error message',
            });
        });
    });
});

describe('initializeStore', () => {
    it('should call all fetch actions', async () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({
            getToken: () => {
                return 'token';
            },
        });

        const mockFetchUpsell = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        const mockFetchProducts = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        const mockFetchBatteries = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        const mockFetchProviders = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        const mockFetchCustomers = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        const mockFetchStores = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        dashboard.fetchUpsells = mockFetchUpsell;
        dashboard.fetchProducts = mockFetchProducts;
        dashboard.fetchBatteries = mockFetchBatteries;
        dashboard.fetchProviders = mockFetchProviders;
        dashboard.fetchCustomers = mockFetchCustomers;
        dashboard.fetchStores = mockFetchStores;

        await dashboard.initializeStore();
        expect(mockFetchUpsell.mock.calls).toHaveLength(1);
        expect(mockFetchProducts.mock.calls).toHaveLength(1);
        expect(mockFetchBatteries.mock.calls).toHaveLength(1);
        expect(mockFetchProviders.mock.calls).toHaveLength(1);
        expect(mockFetchCustomers.mock.calls).toHaveLength(1);
        expect(mockFetchStores.mock.calls).toHaveLength(1);
    });
});

describe('fetch', () => {
    it('should fetch upsells, products and batteries', async () => {
        const DashboardStore = require('../../stores/dashboard').default;
        const dashboard = new DashboardStore({
            getToken: () => {
                return 'token';
            },
        });

        const mockFetchUpsell = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        const mockFetchProducts = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        const mockFetchBatteries = jest.fn(() => {
            return new Promise((resolve) => {
                return resolve();
            });
        });

        dashboard.fetchUpsells = mockFetchUpsell;
        dashboard.fetchProducts = mockFetchProducts;
        dashboard.fetchBatteries = mockFetchBatteries;

        await dashboard.fetch();
        expect(mockFetchUpsell.mock.calls).toHaveLength(1);
        expect(mockFetchProducts.mock.calls).toHaveLength(1);
        expect(mockFetchBatteries.mock.calls).toHaveLength(1);
    });
});

describe('computed methods', () => {
    describe('amountOfUpsells', () => {
        it('should return null if upsell is undefined', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});

           expect(dashboard.amountOfUpsells).toBeNull();
        });

        it('should return the sum of upsells payments', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});

           dashboard.upsells = {
               data: [ { value: 10 }, { value: 30 }, { value: 15 }],
           };

           expect(dashboard.amountOfUpsells).toBe(55);
        });
    });

    describe('amountOfProducts', () => {
        it('should return null if upsell is undefined', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});

           expect(dashboard.amountOfProducts).toBeNull();
        });

        it('should return the sum of products payments', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});

           dashboard.products = {
               data: [ { value: 10 }, { value: 30 }, { value: 15 }],
           };

           expect(dashboard.amountOfProducts).toBe(55);
        });
    });

    describe('amountOfBatteries', () => {
        it('should return null if upsell is undefined', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});

           expect(dashboard.amountOfBatteries).toBeNull();
        });

        it('should return the sum of batteries payments', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});

           dashboard.batteries = {
               data: [ { value: 10 }, { value: 30 }, { value: 15 }],
           };

           expect(dashboard.amountOfBatteries).toBe(55);
        });
    });

    describe('getYearValidRange', () => {
        it('should return one year if current year === minYear', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});
           const currentYear = new Date().getFullYear();

           dashboard.minYear = currentYear;

           expect(dashboard.getYearValidRange).toEqual([currentYear]);
        });

        it('should return an list of valid years', () => {
           const DashboardStore = require('../../stores/dashboard').default;
           const dashboard = new DashboardStore({});
           const currentYear = new Date().getFullYear();

           dashboard.minYear = currentYear - 6;

            const expected = Array.apply(null, Array(7))
               .map((_, index) => {
                   return dashboard.minYear + index;
               });

            expect(dashboard.getYearValidRange).toEqual(expected);
        });
    });
});
