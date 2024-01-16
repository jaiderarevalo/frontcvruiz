import {instance} from "./axios"
import { formClientInterface} from "../interfaces/interfac"
 export const postClient = (data:formClientInterface) => instance.post('/client', data)
 