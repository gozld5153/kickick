import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { googleSignIn } from "../../apis/auth";
import {
  isLoginAction,
  todayLoginAction,
  isPointAction,
} from "../../store/actions/login";

export default function GoogleAuth() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const todayLogin = useSelector((state) => state.login.todayLogin);

  useEffect(() => {
    googleSignIn(location.hash.split("=")[1].split("&")[0])
      .then((res) => {
        const loginData = { ...res.data.data };
        delete loginData.kick_money;
        dispatch(isLoginAction(loginData));
        dispatch(isPointAction(res.data.data.kick_money));
        if (!todayLogin) dispatch(todayLoginAction(true));
      })
      .then(() => navigate("/", { replace: true }));
  }, []);
  return null;
}