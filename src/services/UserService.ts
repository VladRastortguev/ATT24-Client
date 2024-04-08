import $api from "../http";
import {AxiosResponse} from 'axios';
import { AuthResponce } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";
import { itilUser } from "../models/itil/itilUser";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
        
    static async getItilUser(): Promise<AxiosResponse<itilUser[]>>{
        return $api.get<itilUser[]>('/itiluser')
    }
}