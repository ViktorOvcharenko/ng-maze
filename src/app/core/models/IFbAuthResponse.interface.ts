export interface IFbAuthResponse {
  idToken:	string;
  email:	string;
  refreshToken:	string;
  expiresIn:	string;
  localId:	string;
  registered:	boolean;
  displayName?: string;
}
