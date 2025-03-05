import { RoleDTO } from "./role.model";

export interface LoginRequestDTO {
  username: string;
  password: string;
}

export interface LoginResponseDTO {
  token: string;
  username: string;
  lastLoginDate: Date;
  roles: RoleDTO[];
}