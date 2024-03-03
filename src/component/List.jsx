import React from 'react'
import { isEmpty } from '../helper/commonServices'
import useCheckMobileScreen from '../hooks/useCheckMobileScreen'

const List = ({ listData, className }) => {
    const { isMobile, isIpad } = useCheckMobileScreen()
    return (
        !isEmpty(listData) ?
            <ul className={`mt--${isMobile || isIpad ? 15 : 30} list--circle ${className || ""}`}>
                {
                    listData?.map((product, index) => (
                        <li key={`distinct--product-${index}`} className={listData?.length === index + 1 ? '' : 'mb--10'}>
                            <h6 className="fs--18 font--family color--white font--normal">{product}</h6>
                        </li>
                    ))
                }
            </ul>
            : ''
    )
}

export default List