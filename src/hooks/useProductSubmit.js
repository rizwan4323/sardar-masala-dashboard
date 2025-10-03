import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { SidebarContext } from "../context/SidebarContext";
import ProductServices from "../services/ProductServices";
import { notifyError, notifySuccess } from "../utils/toast";
import useAsync from "./useAsync";
import CategoryServices from "../services/CategoryServices";

const generateProductCode = () => {
  const randomNumber1 = Math.floor(1000000000 + Math.random() * 9000000000); // 10 digit number
  const randomNumber2 = Math.floor(1000 + Math.random() * 9000); // 4 digit number
  return `PRD-${randomNumber1}-${randomNumber2}`;
};

const useProductSubmit = (id, type) => {
   const { data } = useAsync(CategoryServices.getAllCategory);

  const [imageUrl, setImageUrl] = useState([]);
  const [preview, setPreview] = useState([]);
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState("");
  const [children, setChildren] = useState("");
  const [stock, setStock] = useState();
  const [price, setPrice] = useState();
  const [price_usd, setPrice_usd] = useState();
  const [promo_price_pkr, setPromo_price_pkr] = useState();
  const [promo_price_usd, setPromo_price_usd] = useState();
  const [deliveryCharges, setDeliveryCharges] = useState();
  const [productCode, setProductCode] = useState("");
  const [tag, setTag] = useState([]);
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);
  const [variations, setVariations] = useState([]);

  // console.log('---------- imageUrl', imageUrl);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (!id) {
      setValue("productCode", generateProductCode()); // Auto-generate for new product
      setProductCode(generateProductCode()); // Auto-generate for new product
    }
  }, [id]);

  const onSubmit = (formData) => {
    console.log("form");

    const result = data?.find(
      (parent) => formData?.parent?.toLowerCase() === parent?.name.toLowerCase()
    );

    // console.log('result ', result);

    if (!imageUrl) {
      notifyError("Image is required!");
      return;
    }

    console.log("imageUrl", imageUrl);
    const productData = {
      title: formData.title,
      delivery: parseInt(formData.deliveryCharges),
      brand: formData.brand ? formData.brand : "No Brand",
      description: formData.description,
      parent: formData.parent,
      children: formData.children,
      // price: formData.price,
      // promo_price_pkr: formData.promo_price_pkr,
      price: variations.length > 0 ? null : formData.price,
      promo_price_pkr: variations.length > 0 ? null : formData.promo_price_pkr,
      price_usd: formData.price_usd,
      promo_price_usd: formData.promo_price_usd,
      productCode: formData.productCode || generateProductCode(),
      // gallery: imageUrl.length >= 1 ? JSON.stringify(imageUrl) : "[]",
      gallery: Array.isArray(imageUrl)
        ? JSON.stringify(imageUrl)
        : JSON.stringify([imageUrl]),
      image: imageUrl.length === 1 ? "" : "",
      // image: imageUrl.length === 1 ? imageUrl[0] : "",
      tag: JSON.stringify(tag),
      stock: formData.stock,
      category_id: result.id,
      variations: variations.length > 0 ? variations : [],
    };
    // console.log(productData);

    if (id) {
      console.log("hello");

      ProductServices.updateProduct(id, productData)
        .then((res) => {
          setIsUpdate(true);

          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    } else {
      // console.log(productData);

      ProductServices.addProduct(productData)
        .then((res) => {
          // console.log('addProduct ',res.reqz);

          setIsUpdate(true);
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
      closeDrawer();
    }
  };

  if (id && type) {
    ProductServices.getProductsByCategory(id)
      .then((res) => {
        if (res) {
          // setValue("sku", res.sku);
          setValue("title", res.title);
          setValue("deliveryCharges", res.delivery);
          setValue("brand", res.brand);
          // setValue("slug", res.slug);
          setValue("description", res.description);
          setValue("parent", res.parent);
          setValue("children", res.children);
          // setValue("type", res.type);
          setValue("unit", res.unit);
          // setValue("quantity", res.quantity);
          // setValue("salePrice", res.price);
          setValue("originalPrice", res.price);
          setValue("price", res.price);
          setValue("price_usd", res.price_usd);
          setValue("promo_price_pkr", res.promo_price_pkr);
          setValue("promo_price_usd", res.promo_price_usd);
          setValue("productCode", res.productCode || generateProductCode());
          setProductCode(res.productCode || generateProductCode());
          setVariations(JSON.parse(res.variations));
          setTag(JSON.parse(res.tag));
          // setImageUrl(res.image ? res.image : res.gallery);
          // setPreview(res.image ? res.image : res.gallery);

          setImageUrl(
            res.gallery ? JSON.parse(res.gallery) : res.image ? [res.image] : []
          );
          setPreview(
            res.previeGallery
              ? JSON.parse(res.previeGallery)
              : res.previewImage
              ? [res.previewImage]
              : []
          );
        }
      })
      .catch((err) => {
        notifyError("There is a server error!");
      });
  }

  useEffect(() => {
    if (!isDrawerOpen) {
      setValue("sku");
      setValue("title");
      setValue("deliveryCharges");
      setValue("productCode");
      setValue("brand");
      setValue("slug");
      setValue("description");
      setValue("parent");
      setValue("children");
      setValue("type");
      setValue("unit");
      setValue("quantity");
      setValue("originalPrice");
      // setValue("salePrice");
      setValue("stock");
      setValue("price");
      setValue("price_usd");
      setValue("promo_price_pkr");
      setValue("promo_price_usd");
      setImageUrl("");
      setPreview("");
      setChildren("");
      setTag([]);
      clearErrors("sku");
      clearErrors("deliveryCharges");
      clearErrors("title");
      clearErrors("brand");
      clearErrors("slug");
      clearErrors("description");
      clearErrors("productCode");
      clearErrors("parent");
      clearErrors("children");
      clearErrors("type");
      clearErrors("unit");
      clearErrors("quantity");
      clearErrors("originalPrice");
      clearErrors("price");
      // clearErrors("salePrice");
      clearErrors("price_usd");
      clearErrors("promo_price_pkr");
      clearErrors("promo_price_usd");
      clearErrors("tax1");
      clearErrors("tax2");
      return;
    }

    if (id) {
      ProductServices.getProductById(id)
        .then((res) => {
          console.log("price-------- ", res);
          if (res) {
            setValue("sku", res.sku);
            setValue("title", res.title);
            setValue("deliveryCharges", res.delivery);
            setValue("brand", res.brand);
            setValue("slug", res.slug);
            setValue("description", res.description);
            setValue("parent", res.parent);
            setValue("children", res.children);
            setValue("type", res.type);
            setValue("unit", res.unit);
            setValue("quantity", res.quantity);
            // setValue("originalPrice", res.originalPrice);
            // setValue("salePrice", res.price);
            setValue("stock", res.stock);
            setValue("price", res.price);
            setValue("price_usd", res.price_usd);
            setValue("promo_price_pkr", res.promo_price_pkr);
            setValue("promo_price_usd", res.promo_price_usd);
            setValue("productCode", res.productCode || generateProductCode());
            setVariations(JSON.parse(res.variations));
            setProductCode(res.productCode || generateProductCode());
            setTag(JSON.parse(res.tag));
            // setImageUrl(res.image ? [res.image] : res.gallery);
            // setPreview(
            //   res.previewImage ? [res.previewImage] : res.previeGallery
            // );

            setImageUrl(
              res.gallery && !Array.isArray(res.gallery)
                ? JSON.parse(res.gallery)
                : res.gallery
                ? res.gallery
                : res.image
                ? [res.image]
                : []
            );
            setPreview(
              res.previeGallery && !Array.isArray(res.previeGallery)
                ? JSON.parse(res.previeGallery)
                : res.previeGallery
                ? res.previeGallery
                : res.previewImage
                ? [res.previewImage]
                : []
            );

            setTitle(res.title);
            setDeliveryCharges(res.delivery);
            setBrand(res.brand);
            // setStock(res.stock);
            // setPrice(res.price)
          }
        })
        .catch((err) => {
          notifyError("There is a server error!");
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, setValue, isDrawerOpen]);

  useEffect(() => {
    setChildren(watch("children"));
  }, [watch, children]);

  return {
    setValue,
    register,
    watch,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    preview,
    setPreview,
    tag,
    setTag,
    title,
    setTitle,
    deliveryCharges,
    setDeliveryCharges,
    brand,
    setBrand,
    stock,
    setStock,
    price,
    setPrice,
    price_usd,
    setPrice_usd,
    promo_price_pkr,
    setPromo_price_pkr,
    promo_price_usd,
    setPromo_price_usd,
    productCode,
    setProductCode,
    generateProductCode,
    isDrawerOpen,
    variations,
    setVariations,
  };
};

export default useProductSubmit;
