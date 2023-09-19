import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";

function useGetUserId(accessToken) {
  const [user_id, setUserId] = useState()

  useEffect(() => {
    const current_user_id = getCurrentUserId(accessToken)
    setUserId(current_user_id)
  }, [user_id])

  return { user_id }

}

export default useGetUserId

const getCurrentUserId = (accessToken) => {
  if (typeof window !== "undefined") {
    if (accessToken) {
      const decoded = jwt_decode(accessToken);
      const user_id = decoded.user_id;
      return user_id;
    } else {
      return false;
    }
  }
};