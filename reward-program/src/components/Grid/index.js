import React from "react";
import './Grid.css';

const Grid = ({ gridModel, errMsg }) => {
    const getRewardPoints = amount => {
        let points = 0;
        const over100 = amount - 100;

        if (over100 > 0) {
            points += (over100 * 2);
        }
        if (amount > 50) {
            points += 50;
        }

        return points;
    };

    if (errMsg) {
        return <div className="no-txs err-msg">{errMsg}</div>
    }

    if (gridModel.length === 0) {
        return <div className="no-txs">No Transactions to display</div>
    }

    return (
        <div className="tbl-container">
            <div className="tbl-header">
                <div className="tx-date">Transaction Date</div>
                <div className="tx-amt">Transaction Amount</div>
                <div className="tx-pts">Earned Reward Points</div>
            </div>
            <div className="tbl-body">
                {
                    gridModel.map((tx, i) => (
                        <div key={`row${i}`} className="tbl-row">
                            <div className="tx-date">{tx.txDate}</div>
                            <div className="tx-amt">{tx.txAmt}</div>
                            <div className="tx-pts">{getRewardPoints(tx.txAmt)} Points</div>
                        </div>)
                    )
                }
            </div>
        </div>
    )
}

export default Grid;