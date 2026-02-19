export interface SignInWithPasswordResponse {
  kind: 'identitytoolkit#VerifyPasswordResponse';
  localId: string;
  email: string;
  displayName: string;
  idToken: string;
  registered: boolean;
  refreshToken: string;
  expiresIn: string;
}
