import React from 'react'
import { isEmpty } from '../../helper/commonServices'
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen'

const TransactionList = ({ list, onAccountClick }) => {
    const {isMobile, isIpad} = useCheckMobileScreen()

    if (isEmpty(list)) return null

    return (
        <div className='account--container'>
            <div className={`mt--30 account--container-wrap ${isMobile || isIpad ? "" : "width--column-one"}`}>
                <ul className='account--container-head flex flex--align-items-center width--column-one bg--secondary pd--30'>
                    <li className='width--column-six-0 font--center'>
                        <h2 className="fs--22 font--family font--semibold color--white">Sr No.</h2>
                    </li>
                    <li className='width--column-six-0 font--center'>
                        <h2 className="fs--22 font--family font--semibold color--white">Amount</h2>
                    </li>
                    <li className='width--column-six-0 font--center'>
                        <h2 className="fs--22 font--family font--semibold color--white">Price</h2>
                    </li>
                    <li className='width--column-six-0 font--center'>
                        <h2 className="fs--22 font--family font--semibold color--white">Symbol</h2>
                    </li>
                    <li className='width--column-six-0 font--center'>
                        <h2 className="fs--22 font--family font--semibold color--white">Transaction Code</h2>
                    </li>
                    <li className='width--column-six-0 font--center'>
                        <h2 className="fs--22 font--family font--semibold color--white">Total</h2>
                    </li>
                </ul>

                <ul className='account--container-body bg--white pd--30'>
                    {
                        list.map((data, indx) => (
                            <li key={`account--${indx}`} className=''>
                                <ul className={`flex flex--align-items-center width--column-one ${list.length === indx + 1 ? '' : 'mb--20'}`}>
                                    <li className='width--column-six-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black">{indx + 1}</span>
                                    </li>
                                    <li className='width--column-six-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black">{data?.amount}</span>
                                    </li>
                                    <li className='width--column-six-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black">{data?.price?.toFixed(2)}</span>
                                    </li>
                                    <li className='width--column-six-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black">{data?.symbol}</span>
                                    </li>
                                    <li className='width--column-six-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black">{data?.transaction_code}</span>
                                    </li>
                                    <li className='width--column-six-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black">{data?.total?.toFixed(2)}</span>
                                    </li>
                                </ul>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default TransactionList