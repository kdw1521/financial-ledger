import {token} from 'shared/util/localStorage'

export const headers = {
    "Authorization" : `Bearer ${token}`,
    "withCredentials" : true,
    'Content-Type': 'application/json',
}