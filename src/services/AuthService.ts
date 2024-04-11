import $api from "../http";
import {Axios, AxiosResponse} from 'axios';
import { AuthResponce } from "../models/response/AuthResponse";
import { itilNewtaskModel } from "../models/itil/itilNewTaskModel";
import { newCommentModel } from "../models/itil/newComment-model";
import { commentModel } from "../models/itil/comment-model";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/login', {email, password})
    }

    static async registration(email: string, password: string): Promise<AxiosResponse<AuthResponce>> {
        return $api.post<AuthResponce>('/registration', {email, password})
    }

    static async logout(): Promise<void> {
        return $api.post('/logout')
    }

    static async setNewTask(obj: object): Promise<AxiosResponse<itilNewtaskModel>> {
        return $api.post<itilNewtaskModel>('/settask', obj)
    }

    static async setNewComment(obj: object, uid: string, tasktype: string): Promise<AxiosResponse<commentModel>> {
        return $api.post<commentModel>(`/setcomment/${uid}/${tasktype}`, obj)
    }
}