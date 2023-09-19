import { useRouter } from "next/router";
import { useState } from "react";
import { clientApi } from "@/services/api-client";

const useAxios = (url = "") => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const post = async (url, postData, token = "") => {
    setLoading(true);
    console.log(token)
    try {
      let response;

      if (token) {
        response = await clientApi.post(url, postData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        response = await clientApi.post(url, postData);
      }
      setData(response.data);
      setLoading(false);
      setSuccess(true);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const del = async (token) => {
    setLoading(true);
    try {
      const response = await clientApi.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error);
    }
  };

  const createPost = async (url, postData, token) => {
    setLoading(true);
    try {
      const response = await clientApi.post(url, postData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setLoading(false);
      setSuccess(true);
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  const update = async (url, postData, token, offTimeout = false) => {
    setLoading(true);
    try {
      const response = await clientApi.put(url, postData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setData(response.data);
      setLoading(false);
      setSuccess(true);
      if (!offTimeout) {
        setTimeout(() => {
          setSuccess(false);
        }, 5000);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error);
    }
  };

  return { data, loading, error, success, post, del, createPost, update };
};

export default useAxios;
