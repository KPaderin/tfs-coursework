import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import {
  authorizationWithGoogleAction,
  authorizationWithGoogleFailure,
  authWithGoogle,
  logoutMe,
} from '../redux/me/actions';

export const useAuthentication = () => {
  const dispatch = useDispatch();

  const onSuccessHandler = (payload) => {
    dispatch(authorizationWithGoogleAction());
    dispatch(authWithGoogle(payload));
  };

  const onFailureHandler = () => {
    dispatch(authorizationWithGoogleAction());
    dispatch(authorizationWithGoogleFailure());
  };

  const login = useGoogleLogin({
    onSuccess: onSuccessHandler,
    onError: onFailureHandler,
  });

  const logout = () => {
    googleLogout();
    dispatch(logoutMe());
  };

  return [login, logout];
};
