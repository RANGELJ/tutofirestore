export enum StoreActionType {
    LOAD_DATA_FROM_LOCAL_STORAGE = '0',
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
}
