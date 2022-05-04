import jwtDecode, { JwtPayload } from "jwt-decode";

const JwtManager = () => {
  let inMemoryToken: string | null = null;

  let refreshTokenTimeoutId: number | null = null;
  const getToken = () => inMemoryToken;
  const setToken = (accessToken: string) => {
    inMemoryToken = accessToken;

    //Decode and set countdown to refresh
    const decoded = jwtDecode<JwtPayload & { userId: number }>(accessToken);
    setRefreshTokenTimeout(decoded.exp! - decoded.iat!);
    return true;
  };

  const abortRefreshToken = () => {
    if (refreshTokenTimeoutId) window.clearTimeout(refreshTokenTimeoutId);
  };
  const deleteInMemoryToken = () => {
    inMemoryToken = null;
    abortRefreshToken();
    return true;
  };
  const getRefreshToken = async () => {
    try {
      const response = await fetch("http://localhost:4000/refresh_token", {
        credentials: "include",
      });
      const data = (await response.json()) as {
        success: boolean;
        token: string;
        type:string;
        avatar:string;
        isHidden:boolean;
      };
      setToken(data.token);
      return {
        success:data.success,
        type:data.type,
        avatar:data.avatar,
        isHidden:data.isHidden || false
      };
    } catch (error) {
      console.log(`error:${error}`);
      deleteInMemoryToken();
      return {
        success:false
      };
    }
  };

  const setRefreshTokenTimeout = (delay: number) => {
    //5s before get new refreshToken

    refreshTokenTimeoutId = window.setTimeout(
      getRefreshToken,
      delay * 1000 - 5000
    );
  };

  return { getToken, setToken, getRefreshToken, deleteInMemoryToken };
};

export default JwtManager();
