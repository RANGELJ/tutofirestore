export enum StoreActionType {
    LOAD_DATA_FROM_LOCAL_STORAGE = '0',
    SET_FIREBASE_AUTH_EMAIL_ADRESS_WAITING = '1',
}

export type StoreAction = {
    type: StoreActionType.LOAD_DATA_FROM_LOCAL_STORAGE;
    payload: {
        firebase: {
            auth: {
                emailAdressWaiting: string | null;
            };
        };
    };
} | {
    type: StoreActionType.SET_FIREBASE_AUTH_EMAIL_ADRESS_WAITING;
    payload: string | null;
}
