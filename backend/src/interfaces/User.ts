import { IAccessToken } from "./AccessToken";

export interface IUser {
    id: string;              
    name: string;
    password:string          
    phone: string;          
    img_profile: string;    
    tokens?: IAccessToken[]; // Relación con los tokens de acceso, se hace opcional ya que un usuario no siempre tendra tokens
}
