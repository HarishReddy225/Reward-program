import React, { useState, useEffect } from "react";
import './AccountList.css';
import TransactionList from '../../components/TransactionList/index.js';
import { getAccountHoldersList } from "../../services/api.js";

const AccountList = props => {
    const [accountList, setAccountList] = useState([]);
    const [selectedAccount, setSelectedAccount] = useState(null);

    const dispAccDetail = accDet => {
        setSelectedAccount(accDet);
    };

    useEffect(() => {
        getAccountHoldersList().then(accounts => {
            const activeAccounts = accounts.filter(accDetail => accDetail.isActive);
            setAccountList(activeAccounts);
        });
    }, []);

    return (
        <div className="account-list-hldr">
            <div className="account-header">List of Account Holders</div>
            {!selectedAccount && <div className="user-hint">Choose the User to see Transactions</div>}
            <div className="account-tiles">
                {
                    accountList.map((acc, i) => {
                        const cls = acc?.accNo === selectedAccount?.accNo ? 'active' : '';
                        return <span className={cls} key={`acc${i}`} onClick={() => { dispAccDetail(acc) }}>{acc.accName}</span>;
                    })
                }
            </div>
            {selectedAccount && <TransactionList accountDetail={selectedAccount} />}
        </div>
    )
}
export default AccountList;