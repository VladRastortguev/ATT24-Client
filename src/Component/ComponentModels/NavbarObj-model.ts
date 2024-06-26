import { OneTaskInterface } from "../../page/DetailsPage/OneTaskInterface";
import { linkListmodel } from "./LinkList";

interface functionRes {
    changeBurger: (newState: boolean) => void
}

export interface NavbarObjmodel{
    navbarObj: {
        firstUl: boolean;
        secondUl: boolean;
        manyLink: number;
        thirdUl: boolean;
        thirdUlAsBurger: boolean;
        thirdUlAsTaskNews: boolean;
        thirdUlObjTask: OneTaskInterface[] | null;
        thirdUlObjTaskInit: OneTaskInterface[] | null
        getOut: boolean;
        getWelcom: boolean;
        pageName: string;
        lastLiEmpty: boolean;
        lastLiIsLogOut: boolean;
        linkList: string[];
        changeBurger: ((newState: boolean) => void) | null
    }
}