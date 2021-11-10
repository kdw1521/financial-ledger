import {HOME_URL} from "shared/action/url";
import axios from "axios";
import {token} from 'shared/util/localStorage'

export const ledger = async () => {
    const datas = await axios.get(HOME_URL, {
        headers: {
            "Authorization" : `Bearer ${token}`
        }
    })
    return datas
}