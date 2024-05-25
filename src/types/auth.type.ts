export type AuthPayloadType = {
    email: string;
    password: string;
}

export type AuthResponseType = {
    accessToken: string;
    user: {
        id: number;
        email: string;
    }
}