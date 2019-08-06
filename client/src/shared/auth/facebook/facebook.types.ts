export interface FacebookAuthResponse {
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    name: string;
    name_format: string;
    picture: { data: [Object] };
    short_name: string;
    email: string;
  };

  tokenDetail: {
    accessToken: string;
    userID: string;
    expiresIn: number;
    signedRequest: string;
    data_access_expiration_time: number;
  };
}
