import { makeAutoObservable, makeObservable } from "mobx";
import { IUser } from "../models/IUser";
import AuthService from "../services/AuthService";
import axios from "axios";
import { AuthResponce } from "../models/response/AuthResponse";
import { API_TASKS, API_URL } from "../http";
import { itilUser } from "../models/itil/itilUser";
// import { TaskItemResponse } from "../models/response/TaskItemResponse";

export default class Store {
    user = {} as IUser;
    itilUser = {} as itilUser;
    isAuth = false;
    isLoading = false;
    
    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

    setItilUser(itilUser: itilUser) {
        this.itilUser = itilUser;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);

            console.log(response);

            localStorage.setItem('token', response.data.accesToken);
            localStorage.setItem('userEmail', email)

            this.setAuth(true);
            this.setUser(response.data.user);

            return '200'
        } catch (e) {
            return '400'
        }   
    }

    

    async registration(email: string, password: string) {
        try {
            const response = await AuthService.registration(email, password);
            console.log(response);
            this.setAuth(true);
            this.setUser(response.data.user);

            return '200'
        } catch (e) {
            console.log(e);

            return '400'
        }   
    }

    async logout() {
        try {
            const response = await AuthService.logout();

            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('UserName');
            
            this.setAuth(false);
            this.setUser({} as IUser);

            // console.log(this.isAuth);
            
        } catch (e) {
            console.log(e);
        }   
    }

    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponce>(`${API_URL}/refresh`, {withCredentials: true})
            console.log(response);
            localStorage.setItem('token', response.data.accesToken);
            localStorage.setItem('admin', String(this.user.admin))
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch(e) {
            console.log(e);
        } finally {
            this.setLoading(false);
        }
    }

    // запросы для итила
} 