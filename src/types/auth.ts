export type LoginBody = {
    username: string,
    password: string
}

export type LoginResult = {
    user_id: string,
    token: string
}

export type RegisterBody = {
    username: string,
    password: string
}

export type User = {
    id: string
    username: string
}