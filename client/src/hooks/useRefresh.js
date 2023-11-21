import { useDispatch, useSelector } from "react-redux";
import api from "../axios";
import { getUserAccessToken, refreshToken } from "../features/user/userSlice";

export default function useRefreshToken() {
  const dispatch = useDispatch();
  const accessToken = useSelector(getUserAccessToken);
  const refresh = async () => {
    api.interceptors.request.use(
      async (config) => {
        await dispatch(refreshToken());

        let currentDate = new Date();
        const decodedToken = jwtDecode(accessToken);
        if (decodedToken.exp * 1000 < currentDate.getTime()) {
          await dispatch(refreshToken());
          config.headers["Authorization"] = "Bearer " + accessToken;
        }
        // return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };
  return refresh;
}
