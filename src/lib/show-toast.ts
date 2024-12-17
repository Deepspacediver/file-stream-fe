import { toast, TypeOptions } from "react-toastify";

const showToast = (data: string, type: TypeOptions = "success") => {
  toast(data, { type });
};

export default showToast;
