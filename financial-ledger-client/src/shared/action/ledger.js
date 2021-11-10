import {HOME_URL} from "shared/action/url";
import axios from "axios";
import { headers } from "shared/util/headers";

export const ledger = async () => {
    const datas = await axios.get(HOME_URL, {
        headers: headers
    })
    return datas
}