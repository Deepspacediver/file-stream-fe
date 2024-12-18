import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import showToast from "./show-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onError: (data) => {
        if (data instanceof AxiosError) {
          const errorMessage = data?.response?.data.error;
          return showToast(errorMessage ?? data.message, "error");
        }
        return showToast(data.message, "error");
      },
    },
  },
});

export default queryClient;
