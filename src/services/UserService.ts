import $api from "../http";
import {AxiosResponse} from 'axios';
import { AuthResponce } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";
import { itilUser } from "../models/itil/itilUser";
import { itilCompany } from "../models/itil/itilCompany";
import { commentModel } from "../models/itil/comment-model";
import { OneTaskInterface } from "../page/DetailsPage/OneTaskInterface";

export default class UserService {
    static fetchUsers(): Promise<AxiosResponse<IUser[]>> {
        return $api.get<IUser[]>('/users')
    }
        
    static async getItilUser(): Promise<AxiosResponse<itilUser[]>>{
        return $api.get<itilUser[]>('/itiluser')
    }

    static async getCompanyItil(): Promise<AxiosResponse<itilCompany[]>>{
        return $api.get<itilCompany[]>(`/onecompany/${localStorage.getItem('UserUID')}`)
    }

    static async getComment(taskUid:String, taskType:String): Promise<AxiosResponse<commentModel[]>> {
        return $api.get<commentModel[]>(`/getcomment/${taskUid}/${taskType}`)
    }

    static async getOneTask(taskUid:String, taskType:String): Promise<AxiosResponse<OneTaskInterface[]>> {
        return $api.get<OneTaskInterface[]>(`/getonetask/${taskUid}/${taskType}`)
    }

    static async getAllTask(email:string): Promise<AxiosResponse<OneTaskInterface[]>> {
        return $api.get<OneTaskInterface[]>(`/getalltask/${email}`)
    }
}