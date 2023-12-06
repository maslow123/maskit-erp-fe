import { headers } from '@/services/headers'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'

const hasError = (errors, key) => {
    const invalidEmail =
        errors?.length > 0 &&
            errors.find((err) => err !== 'email') &&
            errors.find((err) => err === 'invalid-format-email')
            ? true
            : false

    if (key === 'email' && invalidEmail) {
        return invalidEmail
    }

    if (key === 'confirm_password') {
        const passwordNotMatch =
            errors?.length > 0 &&
                errors.find((err) => err !== 'confirm_password') &&
                errors.find((err) => err === 'password-not-match')
                ? true
                : false
        return passwordNotMatch
    }

    return errors?.length > 0 && errors.indexOf(key) !== -1
}

const checkEmailFormat = (email) => {
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    const valid = email.match(emailFormat) ? true : false

    return valid
}

const validate = (payload, noError = []) => {
    const key = Object.keys(payload)
    let errors = []

    key.map((prop) => {
        const skipError = noError.find((p) => p === prop)
        if (skipError === undefined) {
            let isError = false
            if (payload[prop]?.length < 1 || payload[prop] === null) {
                isError = true
                errors = [...errors, prop]
            }
            if (prop === 'email' && !isError && !checkEmailFormat(payload[prop])) {
                errors = [...errors, 'invalid-format-email']
            }
            if (
                prop === 'confirm_password' &&
                !isError &&
                payload[prop] !== payload['password']
            ) {
                errors = [...errors, 'password-not-match']
            }
        }
    })

    return errors
}

const formatMoney = (number, withCurrency = true) => {
    let money = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(number)
    if (!withCurrency) {
        money = money.replaceAll('Rp', '').trim()
    }
    return money
}

const getToken = () => {
    const token = Cookies.get('token')
    headers.headers.authorization = `Bearer ${token}`
}

const showToast = (type, message, config) => {
    console.log('showToast')
    toast[type](message, config)
}

const formatDate = (number, withTimestamp = true) => {
    const date = new Date(number * 1000)
    const opt = { dateStyle: 'full' }
    if (withTimestamp) {
        opt.timeStyle = 'long'
    }
    return new Intl.DateTimeFormat('id-ID', opt).format(date)
}

const getPartOfDay = () => {
    const date = new Date()
    const hours = date.getHours()

    if (hours < 12) {
        return 'Morning'
    } else if (hours < 15) {
        return 'Afternoon'
    } else if (hours < 17) {
        return 'Evening'
    }

    return 'Night'
}

const ellipsisText = (str) => {
    if (str.length > 50) {
        str = str.slice(0, 50)
        str += '...'
    }

    return str
}

const getTotalTransaction = (data) => {
    return data?.transaction?.length > 0
        ? data.transaction
            .map((tx) => tx.total)
            .reduce((acc, amount) => acc + amount)
        : 0
}

const logout = (ctx, router) => {
    const cookies = Object.keys(Cookies.get())
    cookies.forEach((cookieName) => {
        Cookies.remove(cookieName, {})
    })

    router.push('/login')
}

function objectToQueryString(obj) {
    return Object.keys(obj)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(obj[key])}`)
        .join('&')
}

export {
    getToken,
    getTotalTransaction,
    hasError,
    checkEmailFormat,
    validate,
    formatMoney,
    showToast,
    formatDate,
    getPartOfDay,
    ellipsisText,
    logout,
    objectToQueryString
}
