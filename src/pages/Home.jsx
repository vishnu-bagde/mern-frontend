import React, { useContext, useEffect, useState } from 'react'
import { apiFetch } from '../helper/apiFetch'
import AccountList from '../component/Account/AccountList'
import { isEmpty } from '../helper/commonServices'
import TransactionList from '../component/Account/TransactionList'
import Checkbox from '../component/Checkbox/Checkbox'
import useCheckMobileScreen from '../hooks/useCheckMobileScreen'
import List from '../component/List'
import { MyAppContext } from '../context/MyAppContext'

const Home = () => {
  const { toggleGlobalLoader } = useContext(MyAppContext)
  const [accountData, setAccountData] = useState([])
  const [transactionData, setTransactionData] = useState([])
  const { isMobile, isIpad } = useCheckMobileScreen()
  const [distinctProducts, setDistinctProducts] = useState([])
  const [transactionID, setTransactionID] = useState([])

  useEffect(() => {
    getCustomerDetails()
  }, [])

  const getCustomerDetails = async (e) => {
    toggleGlobalLoader(true)
    const response = await apiFetch(`active-customers`, "GET")
    if (!response.message) {
      setAccountData(response)
    }
    toggleGlobalLoader(false)
  }

  const getTransactions = async (account_id) => {
    toggleGlobalLoader(true)
    const response = await apiFetch(`get-transaction`, "POST", { account_id })
    setTransactionData(response)
    toggleGlobalLoader(false)
  }

  const handleCheckbox = async (isChecked, ID) => {
    if (ID === "distinctProducts") {

      if (isChecked) {
        toggleGlobalLoader(true)

        const response = await apiFetch(`distinct-products`, "GET")
        setDistinctProducts(response[0].distinctProducts)
        toggleGlobalLoader(false)
      } else {
        setDistinctProducts([])
      }

    } else if (ID === "belowTransaction") {

      if (isChecked) {

        toggleGlobalLoader(true)
        const newArr = accountData?.map((data) => {
          return data?.accounts
        })

        const response = await apiFetch(`low-amount-accounts`, "POST", { accounts: [...newArr.flat()] })
        setTransactionID(response)
        toggleGlobalLoader(false)

      } else {
        setTransactionID([])
      }
    }
  }

  return (
    <section className="container--fluid pt--50 pb--50">
      <h1 className="fs--40 font--bold color--white font--center">Account Details</h1>
      <AccountList list={accountData} onAccountClick={getTransactions} />

      <ul className={`mt--30 flex ${isMobile || isIpad ? 'flex--direction-column' : ''}`}>
        <li className={isMobile || isIpad ? 'mb--30' : 'mr--20'}>
          <Checkbox id={'distinctProducts'} label={"Display distinct list of products"} onChange={handleCheckbox} />
          <List listData={distinctProducts} />
        </li>
        <li>
          <Checkbox id={'belowTransaction'} label={"Display account IDs with transactions under 5000."} onChange={handleCheckbox} />
          <List listData={transactionID} />
        </li>
      </ul>

      {
        !isEmpty(transactionData) ?
          <div className={`mt--${isMobile || isIpad ? 50 : 100}`}>
            <h2 className="font--family font--semibold fs--30 color--white">{transactionData?.transactions?.length} Transactions from account ID: {transactionData?.account_id}</h2>
            <TransactionList list={transactionData?.transactions} />
          </div>
          : ''
      }
    </section>
  )
}

export default Home