import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import CategoryServices from "../services/CategoryServices";
import { notifyError, notifySuccess } from "../utils/toast";

const useCategorySubmit = (id) => {
   const [imageUrl, setImageUrl] = useState("");
  const [preview, setPreview]= useState(null)
  const [children, setChildren] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ name, type }) => {
    if (!imageUrl) {
      notifyError("Icon is required!");
      return;
    }
    const categoryData = {
      name: name,
           icon: imageUrl,
      children: children,
    };

    if (id) {
      CategoryServices.updateCategory(id, categoryData)
        .then((res) => {
          console.log(res?.data);
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      CategoryServices.addCategory(categoryData)
        .then((res) => {
          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("parent");
      setValue("name");
      setValue("children");
      setValue("type");
      setImageUrl("");
      setPreview("");
      setChildren([]);
      clearErrors("parent");
      // setValue("slug");
      clearErrors("children");
      clearErrors("type");
      return;
    }
    if (id) {
      CategoryServices.getCategoryById(id)
        .then((res) => {
          if (res) {
            // setValue("parent", res.name);
            setValue("name", res.name);
            // setValue("slug", res.slug);
            // console.log('iiiiiiiiiiiiiiiiiii', res);
            // setChildren(res.children);
            // setValue("type", res.type);
            setChildren(JSON.parse(res.children));
            setValue("icon", res.icon);
            setImageUrl(res.icon);
            setPreview(process.env.REACT_APP_IMAGE_UPLOAD_URL +"/"+res.icon);
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);
  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    preview,
    setPreview,
    children,
    setChildren,
  };
};

export default useCategorySubmit;