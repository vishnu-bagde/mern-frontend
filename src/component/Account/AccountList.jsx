import React from 'react'
import { isEmpty } from '../../helper/commonServices'
import './Account.scss'
import useCheckMobileScreen from '../../hooks/useCheckMobileScreen'

const AccountList = ({ list, onAccountClick }) => {
    const {isMobile, isIpad} = useCheckMobileScreen()

    if (isEmpty(list)) return null

    return (
        <div className='account--container'>
            <div className={`mt--30 account--container-wrap ${isMobile || isIpad ? "" : "width--column-one"}`}>
                <ul className='account--container-head flex flex--align-items-center width--column-one bg--secondary pd--30'>
                    <li className='width--column-three-0 font--center'>
                        <h2 className="fs--25 font--family font--semibold color--white">Name</h2>
                    </li>
                    <li className='width--column-three-0 font--center'>
                        <h2 className="fs--25 font--family font--semibold color--white">Address</h2>
                    </li>
                    <li className='width--column-three-0 font--center'>
                        <h2 className="fs--25 font--family font--semibold color--white">Accounts</h2>
                    </li>
                </ul>

                <ul className='account--container-body bg--white pd--30'>
                    {
                        list.map((data, indx) => (
                            <li key={`account--${indx}`} className=''>
                                <ul className={`account--container-sub flex flex--align-items-center width--column-one ${list.length === indx + 1 ? '' : 'mb--20'}`}>
                                    <li className='width--column-three-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black content">{data?.name}</span>
                                    </li>
                                    <li className='width--column-three-0 font--center'>
                                        <span className="fs--18 font--family font--normal color--black content">{data?.address}</span>
                                    </li>
                                    <li className='width--column-three-0 font--left'>
                                        <ul className={`flex flex--align-items-center flex--wrap ${isMobile || isIpad ? "flex--justify-content-center" : ""}`}>
                                            {
                                                data?.accounts?.map((account, index) => (
                                                    <li key={`account--${indx}-${index}`} className={`mb--10 mr--5`}>
                                                        <button className="btn btn--background" onClick={() => onAccountClick(account)}>
                                                            <span className="fs--18 font--family font--normal">{account}</span>
                                                        </button>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <span className="fs--16 font--family font--normal font--italic color--black font--left content">Click on account number to display transactions.</span>
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

export default AccountList