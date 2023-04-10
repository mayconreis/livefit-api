import { ILoginResponse } from './interfaces';

export default function authenticateSerializable(token: string): ILoginResponse {
  return <ILoginResponse>{
    token,
  };
}
