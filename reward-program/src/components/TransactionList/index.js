import React, { useState, useEffect } from "react";
import moment from 'moment';
import './TransactionList.css';
import Grid from "../../components/Grid";
import { getTransactionByAccount } from "../../services/api.js";
import { DATE_FORMAT } from "../../app.constant";

export default ({ accountDetail }) => {
    const defaultRangeFilter = 'all';
    const nextDay = moment().add(1, 'days').format(DATE_FORMAT);
    const [rangeFilter, setRangeFilter] = useState(defaultRangeFilter);
    const [transactionList, setTransactionList] = useState([]);
    const [chosenTransaction, setChosenTransaction] = useState([]);
    const [errMsg, setErrMsg] = useState('');
    const isInRange = (date, startRange) => {
        return moment(date).isBetween(startRange, nextDay);
    }

    const rangeListener = e => {
        let txs = transactionList;
        let startRange = '';
        
        switch (e.target.value) {
            case '1':
                startRange = moment().subtract(1, 'months').startOf('month').format(DATE_FORMAT);
                break;
            case '3':
                startRange = moment().subtract(3, 'months').startOf('month').format(DATE_FORMAT);
                break;
            case 'all':
            default:
                startRange = '';
        }

        if (startRange) {
            txs = transactionList.filter(tx => {
                return isInRange(tx.txDate, startRange);
            });
        }
        setRangeFilter(e.target.value);
        setChosenTransaction(txs);
    };

    useEffect(() => {
        if (accountDetail?.accNo) {
            getTransactionByAccount(accountDetail.accNo).then(txs => {
                const debitedTxs = txs.filter(tx => tx.txType === 'debit');
                setTransactionList(debitedTxs);
                setChosenTransaction(debitedTxs);
                setRangeFilter(defaultRangeFilter);
            }).catch(err => {
                setErrMsg(err);
            });
        } else {
            setTransactionList([]);
        }
    }, [accountDetail?.accNo]);

    return (
        <div className="tx-list-hldr">
            <div className="tx-header">Transaction Detail of {accountDetail?.accName || 'User'}</div>
            <div className="tx-actions">
                <div className="range-container">
                    <label>Choose Range:</label>
                    <select onChange={rangeListener} value={rangeFilter}>
                        <option value="all">All Transactions</option>
                        <option value="3">Last Three Months</option>
                        <option value="1">Current Month</option>
                    </select>
                </div>
            </div>
            <div className="tx-content">
                <Grid gridModel={chosenTransaction} errMsg={errMsg} />
            </div>
        </div>
    )
}
