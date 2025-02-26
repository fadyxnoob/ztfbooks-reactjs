import React from 'react'
import PaymentInfo from '../../pages/PaymentInfo/PaymentInfo'
import VoucherPay from '../../pages/VoucherPay/VoucherPay'
import MobilePay from '../../pages/MobilePay/MobilePay'
import { useParams } from 'react-router-dom'
import FlutterPayComponent from '../../Payments/FlutterPayComponent'

const Methods = () => {
    const {paymentMethod} = useParams()

    if(paymentMethod === 'VOUCHER') return <VoucherPay />
    if(paymentMethod === 'BANK') return <PaymentInfo />
    if(paymentMethod === 'MOBILE') return <MobilePay />
}

export default Methods
