// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud } from "react-icons/fi";
// import { IoIosCloseCircle } from "react-icons/io";

// const ProductImgUploader = ({ setImageUrl, imageUrl }) => {
//   const [files, setFiles] = useState([]);
//   // const [imageUrl, setImgUrl] = useState([]);
//   const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL;
//   // const upload_Preset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

//   //   console.log('files >>>>>>>> 3', imageUrl);
//   const { getRootProps, getInputProps } = useDropzone({
//     accept: "image/*",
//     multiple: true,
//     // maxSize: 500000,
//     maxSize: 5000000,
//     onDrop: (acceptedFiles) => {
//       // console.log(acceptedFiles);
//       setFiles(
//         acceptedFiles.map((file) =>
//           Object.assign(file, {
//             preview: URL.createObjectURL(file),
//           })
//         )
//       );
//     },
//   });

//   // console.log('old iamge ', imageUrl);

//   useEffect(() => {
//     // const uploadURL = uploadUrl;
//     // const uploadPreset = upload_Preset;
//     // console.log(uploadUrl);
//     if (files) {
//       files.forEach((file) => {
//         const formData = new FormData();
//         formData.append("file", file);
//         axios({
//           url: uploadUrl,
//           method: "POST",
//           data: formData,
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//         })
//           .then((res) => {
//             // const correctedImageUrl = res.data.image;
//             const correctedImageUrl = res.data.images[0];

//             res.data.images &&
//               setImageUrl((prev) => [...prev, correctedImageUrl]);
//           })
//           .catch((err) => console.log(err));
//       });
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [files, uploadUrl, setImageUrl]);

//   useEffect(
//     () => () => {
//       // Make sure to revoke the data uris to avoid memory leaks
//       files.forEach((file) => URL.revokeObjectURL(file.preview));
//     },
//     [files]
//   );

//   const removeImage = (index) => {
//     // console.log("--------index", index);
//     const newImageUrl = imageUrl.filter((_, i) => i !== index);
//     setImageUrl(newImageUrl);
//   };
//   return (
//     <div className="w-full text-center">
//       <div
//         className="px-6 pt-5 pb-6 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
//         // className="px-6 pt-5 pb-6 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-md cursor-pointer"
//         {...getRootProps()}
//       >
//         <input {...getInputProps()} />
//         <span className="mx-auto flex justify-center">
//           <FiUploadCloud className="text-3xl base-color" />
//         </span>
//         <p className="text-sm mt-2">Drag your image here</p>
//         <em className="text-xs text-gray-400">
//           (Only *.jpeg and *.png images will be accepted)
//         </em>
//       </div>
//       {imageUrl && Array.isArray(imageUrl) ? (
//         <aside className="flex flex-row flex-wrap mt-4">
//           {imageUrl.map((file, i) => (
//             <div className="relative" key={i}>
//               <IoIosCloseCircle
//                 onClick={() => removeImage(i)}
//                 className="absolute top-0 text-2xl bg-white text-gray-300 rounded-full cursor-pointer transition-all duration-300 ease-in-out hover:text-gray-400 hover:-translate-y-1"
//               />{" "}
//               <img
//                 key={i}
//                 className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
//                 src={file.replace("5055", "4000")}
//                 alt=""
//               />
//             </div>
//           ))}
//         </aside>
//       ) : (
//         <aside className="flex flex-row flex-wrap mt-4">
//           <img
//             className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 max-h-24 p-2"
//             src={
//               imageUrl.startsWith("http")
//                 ? imageUrl
//                 : `${imageUrl.replace("5055", "4000")}`
//               // : `h/ttp://localhost:5055/upload/${imageUrl}`
//             }
//             alt=""
//           />
//         </aside>
//       )}
//     </div>
//   );
// };

// export default ProductImgUploader;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { IoIosCloseCircle } from "react-icons/io";

const ProductImgUploader = ({ setImageUrl, imageUrl,preview, setPreview }) => { 
  const [files, setFiles] = useState([]);
  // const [preview, setPreview] = useState([]);  
  const uploadUrl = process.env.REACT_APP_IMAGE_UPLOAD_URL;

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    multiple: true,
    maxSize: 5000000,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        )
      );
    },
  });

  // ✅ Upload files
  useEffect(() => {
    if (files && files.length > 0) {
      files.forEach((file) => {
        const formData = new FormData();
        formData.append("file", file);

        axios({
          url: uploadUrl,
          method: "POST",
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        })
          .then((res) => {
            const fileName = res.data.files[0]; // for DB
            const fileUrl = res.data.images[0]; // for preview

            setImageUrl((prev) => [...prev, fileName]); // DB
            setPreview((prev) => [...prev, fileUrl]);   // UI
          })
          .catch((err) => console.log(err));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  // ✅ Cleanup previews from memory
  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  // ✅ Remove image
const removeImage = (index) => {
  const arrImageUrl = Array.isArray(imageUrl)
    ? imageUrl
    : JSON.parse(imageUrl || "[]");

  const arrPreview = Array.isArray(preview)
    ? preview
    : JSON.parse(preview || "[]");

  const newImageUrl = arrImageUrl.filter((_, i) => i !== index);
  const newPreview = arrPreview.filter((_, i) => i !== index);

  setImageUrl(newImageUrl);
  setPreview(newPreview);
};


  return (
    <div className="w-full text-center">
      {/* Upload Area */}
      <div
        className="px-6 pt-5 pb-6 border border-gray-300 dark:border-gray-600 rounded-md cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="mx-auto flex justify-center">
          <FiUploadCloud className="text-3xl base-color" />
        </span>
        <p className="text-sm mt-2">Drag your images here</p>
        <em className="text-xs text-gray-400">
          (Only *.jpeg and *.png images will be accepted)
        </em>
      </div>

      {/* ✅ Previews */}
      {preview && preview.length > 0 && (
        <aside className="flex flex-row flex-wrap mt-4 gap-2">
          {preview.map((url, i) => (
            <div className="relative" key={i}>
              <IoIosCloseCircle
                onClick={() => removeImage(i)}
                className="absolute top-0 right-0 text-2xl bg-white text-gray-300 rounded-full cursor-pointer hover:text-gray-500"
              />
              <img
                className="inline-flex border rounded-md border-gray-100 dark:border-gray-600 w-24 h-24 object-cover p-2"
                src={url.replace("5055", "4000")}
                alt={`preview-${i}`}
              />
            </div>
          ))}
        </aside>
      )}
    </div>
  );
};

export default ProductImgUploader;
