const fs = require('fs');

/**
 * Класс TransactionAnalyzer для анализа транзакций.
 * @author Maria
 * @since v.0.2
 */
class TransactionAnalyzer {
    transactions = [];

    /**
     * constructor transactionsArray
     * @param {Array} transactionsArray - Массив транзакций для инициализации 
     * 
     * @author Maria
     * @since v.0.2
     */
    constructor(transactionsArray) {
        this.transactions = transactionsArray;
    }

    /**
     * Добавляет новую транзакцию в массив существующих транзакций.
     * @param {Object} transaction - Новая транзакция для добавления.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * 
     * @author Maria
     * @since v.0.2
     */
    addTransactions(transaction) {
        this.transactions.push(transaction);
    }

    /**
     * Возвращает массив всех транзакций
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @returns {Array} Массив всех транзакций.
     * 
     * @author Maria
     * @since v.0.2
     */
    getAllTransaction() {
        return this.transactions;
    }

    /**
     * Добавляет функцию `string` к каждой транзакции для представления в виде JSON.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * 
     * @author Maria
     * @since v.0.2
     */
    addToAllString() {
        this.transactions.forEach((item) => {
            if (!('string' in item)) {
                item.string = function () { return JSON.stringify(item) }
            }
        })
    }

    /**
     * Возвращает массив всевозможных типов транзакций (например, ['debit', 'credit']).
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {string} type - Тип транзакции, по которому нужно выполнить фильтрацию.
     * @returns {Array} Массив уникальных транзакций заданного типа.
     * 
     * @author Maria
     * @since v.0.2
     */
    getUniqueTransactionType(type) {
        const uniqueSet = new Set();

        this.transactions.forEach(item => {
            if (item.transaction_type === type) {
                uniqueSet.add(item);
            }
        })

        return Array.from(uniqueSet);
    }

    /**
     * Рассчитывает общую сумму всех транзакций.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @returns {number} Общая сумма всех транзакций.
     * 
     * @author Maria
     * @since v.0.2
     */
    calculateTotalAmount() {
        return this.transactions.reduce((acc, val) => {
            return acc + val.transaction_amount;
        }, 0);
    }

    /**
     * Вычисляет общую сумму транзакций за указанный год, месяц и день.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {number} year - Год для фильтрации транзакций.
     * @param {number} month - Месяц для фильтрации транзакций (1-12).
     * @param {number} day - День месяца для фильтрации транзакций (1-31).
     * @returns {number} Общая сумма всех транзакций по указанной дате.
     * 
     * @author Maria
     * @since v.0.2
     */
    calculateTotalAmountByDate(year, month, day) {
        return this.transactions.reduce((acc, val) => {
            const date = new Date();
            date.setFullYear(year);
            date.setMonth(month - 1);
            date.setDate(day);

            const transactionDate = new Date(val.transaction_date);

            if (
                transactionDate.getDate() === date.getDate() &&
                transactionDate.getMonth() === date.getMonth() &&
                transactionDate.getFullYear() === date.getFullYear()
            ) {
                return acc + val.transaction_amount;
            } else {
                return acc;
            }
        }, 0);
    }

    /**
     * Возвращает транзакции указанного типа (debit или credit) или пустой объект, если такая транзакция не найдена.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {string} type - Тип транзакции для поиска.
     * @returns {Object} Первая транзакция указанного типа или пустой объект, если не найдено.
     * 
     * @author Maria
     * @since v.0.2
     */
    getTransactionByType(type) {
        return this.transactions.find(item => item.transaction_type == type) || {};
    }

    /**
     * Возвращает транзакции, проведенные в указанном диапазоне дат от startDate до endDate.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {Date} startDate - Начальная дата диапазона (включительно).
     * @param {Date} endDate - Конечная дата диапазона (включительно).
     * @returns {Array} Массив транзакций в указанном диапазоне дат.
     * 
     * @author Maria
     * @since v.0.2
     */
    getTransactionsInDateRange(startDate, endDate) {
        return this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.transaction_date);
            return transactionDate >= startDate && transactionDate <= endDate;
        });
    }

    /**
     * Возвращает транзакции, совершенные с указанным торговым местом или компанией.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {string} merchantName - Имя продавца (торговца) для фильтрации транзакций.
     * @returns {Array} Массив транзакций с указанным именем продавца.
     * 
     * @author Maria
     * @since v.0.2
     */
    getTransactionsByMerchant(merchantName) {
        return this.transactions.reduce((acc, val) => {
            if (val.merchant_name == merchantName) {
                acc.push(val);
            }
            return acc;
        }, [])
    }

    /**
     * Возвращает среднее значение транзакций.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @returns {number} Среднее значение суммы транзакций.
     * 
     * @author Maria
     * @since v.0.2
     */
    calculateAverageTransactionAmount() {
        return this.calculateTotalAmount() / this.transactions.length;
    }

    /**
     * Возвращает транзакции с суммой в заданном диапазоне от minAmount до maxAmount.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {number} minAmount - Минимальная сумма транзакции для фильтрации.
     * @param {number} maxAmount - Максимальная сумма транзакции для фильтрации.
     * @returns {Array} Массив транзакций, чья сумма находится в указанном диапазоне.
     * 
     * @author Maria
     * @since v.0.2
     */
    getTransactionsByAmountRange(minAmount, maxAmount) {
        return this.transactions.reduce((acc, val) => {
            if (val.transaction_amount >= minAmount && val.transaction_amount <= maxAmount) {
                acc.push(val);
            }
            return acc;
        }, [])
    }

    /**
     * Вычисляет общую сумму дебетовых транзакций.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @returns {number} Общая сумма всех транзакций типа "debit".
     * 
     * @author Maria
     * @since v.0.2
     */
    calculateTotalDebitAmount() {
        return this.transactions.reduce((acc, val) => {
            if (val.transaction_type == 'debit') {
                return acc + val.transaction_amount;
            }
            return acc;
        }, 0)
    }

    /**
     * Возвращает месяц, в котором было больше всего транзакций.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {Array} [arr] - Массив транзакций для анализа (опционально).
     * @returns {(number|Array<number>)} Месяц или массив месяцев с наибольшим количеством транзакций.
     * 
     * @author Maria
     * @since v.0.2
     */
    findMostTransactionsMonth(arr) {
        const monthCount = {};
        if (arr == undefined) {
            arr = this.transactions;
        }

        arr.forEach((item) => {
            const month = new Date(item.transaction_date).getMonth() + 1;

            if (month in monthCount) {
                monthCount[month] = monthCount[month] + 1;
            } else {
                monthCount[month] = 1;
            }
        })

        let mostTransactionsMonth = [];
        let maxTransactionCount = 0;

        for (const month in monthCount) {
            if (monthCount[month] > maxTransactionCount) {
                maxTransactionCount = monthCount[month];
            }
        }

        for (const month in monthCount) {
            if (monthCount[month] == maxTransactionCount) {
                mostTransactionsMonth.push(parseInt(month))
            }
        }

        return mostTransactionsMonth.length == 1 ? mostTransactionsMonth[0] : mostTransactionsMonth;
    }

    /**
     * Возвращает месяц, в котором было больше дебетовых транзакций.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @returns {(number|Array<number>)} Месяц или массив месяцев с наибольшим количеством дебетовых транзакций.
     * 
     * @author Maria
     * @since v.0.2
     */
    findMostDebitTransactionMonth() {
        return this.findMostTransactionsMonth(this.transactions.filter(item => item.transaction_type == 'debit'));
    }

    /**
     * Возвращает каких транзакций больше всего.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @returns {string} Тип транзакций с наибольшим количеством: 'debit' (дебет) или 'credit' (кредит), либо 'equal' (равное количество).
     * 
     * @author Maria
     * @since v.0.2
     */
    mostTransactionTypes() {
        const debitLength = this.transactions.filter(item => item.transaction_type == 'debit').length;
        const creditLength = this.transactions.filter(item => item.transaction_type == 'credit').length;

        if (debitLength == creditLength) {
            return 'equal'
        } else {
            return debitLength > creditLength ? 'debit' : 'credit';
        }
    }

    /**
     * Возвращает транзакции, совершенные до указанной даты.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {Date} date - Дата, до которой нужно получить транзакции.
     * @returns {Array} Массив транзакций, совершенных до указанной даты.
     * 
     * @author Maria
     * @since v.0.2
     */
    getTransactionsBeforeDate(date) {
        return this.transactions.filter(item => {
            return new Date(item.transaction_date) < date;
        })
    }

    /**
     * Возвращает транзакцию по ее уникальному идентификатору.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @param {number|string} id - Идентификатор транзакции для поиска.
     * @returns {Object} Найденная транзакция или пустой объект, если транзакция не найдена.
     * 
     * @author Maria
     * @since v.0.2
     */
    findTransactionById(id) {
        return this.transactions.find(item => item.transaction_id == id) || {};
    }

    /**
     * Возвращает новый массив, содержащий только описания транзакций.
     * @method
     * @memberof TransactionAnalyzer
     * @public
     * @returns {Array<string>} Массив строк, содержащих описания транзакций.
     * 
     * @author Maria
     * @since v.0.2
     */
    mapTransactionDescriptions() {
        return this.transactions.map(item => {
            return item.transaction_description;
        })
    }
}

let jsonData = [];

const data = fs.readFileSync('./transactions.json', 'utf8');
jsonData = JSON.parse(data);

const analyzer = new TransactionAnalyzer(jsonData);
analyzer.addToAllString();

console.log(analyzer.getUniqueTransactionType('credit'));
console.log(analyzer.calculateTotalAmount());
console.log(analyzer.calculateTotalAmountByDate(2019, 4, 25));
console.log(analyzer.getTransactionByType('debit'));
console.log(analyzer.getTransactionsInDateRange(new Date('2019-04-30'), new Date()))
console.log(analyzer.getTransactionsByMerchant('EntertainmentStoreABC'));
console.log(analyzer.calculateAverageTransactionAmount());
console.log(analyzer.getTransactionsByAmountRange(95, 40));
console.log(analyzer.calculateTotalDebitAmount());
console.log(analyzer.findMostTransactionsMonth());
console.log(analyzer.findMostDebitTransactionMonth());
console.log(analyzer.mostTransactionTypes());
console.log(analyzer.getTransactionsBeforeDate(new Date('2019-01-31')))
console.log(analyzer.findTransactionById(19))
console.log(analyzer.mapTransactionDescriptions());