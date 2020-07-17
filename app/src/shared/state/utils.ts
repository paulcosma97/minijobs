import {TypedUseSelectorHook, useSelector} from "react-redux";
import {RootState} from "./reducer";

export interface Action<Type = string, Payload = any> {
    type: Type;
    payload?: Payload;
}

export const useTypedSelector = useSelector as TypedUseSelectorHook<RootState>;