import { IUser } from "../IUser";

export interface AuthResponce {
    accesToken: string;
    refreshToken: string;
    user: IUser;
}