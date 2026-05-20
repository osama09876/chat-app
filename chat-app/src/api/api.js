const BASE_URL = "http://localhost:8000/api/v1";

export const register_URL = `${BASE_URL}/auth/register`;
export const login_URL = `${BASE_URL}/auth/login`;
export const logout_URL = `/auth/logout`;
export const all_users_URL = `${BASE_URL}/auth/users`;

export const create_group_URL = `${BASE_URL}/conversations/group`;
export const create_private_URL = `${BASE_URL}/conversations/private`;
