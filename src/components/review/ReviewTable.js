import React from "react";
 import {
  TableCell,
  TableBody,
  TableRow,
   Avatar,
} from "@windmill/react-ui";
 import MainModal from "../modal/MainModal";
import MainDrawer from "../drawer/MainDrawer";
import ShowHideButton from "../table/ShowHideButton";
import EditDeleteButton from "../table/EditDeleteButton";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import dayjs from "dayjs";
import BannerDrawer from "../drawer/BannerDrawer";
import { FaStar, FaRegStar } from "react-icons/fa";

const ReviewsTable = ({ reviews }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "....";
    } else {
      return text;
    }
  }
  return (
    <>
      <MainModal id={serviceId} title={title} />
      <MainDrawer>
        <BannerDrawer id={serviceId} />
      </MainDrawer>
      <TableBody>
        {/* {console.log(products)} */}
        {reviews?.map((review, i) => (
          <TableRow key={i + 1}>
            <TableCell>{review?.id}</TableCell>
            <TableCell>{review?.user?.name || review.reviewerName}</TableCell>
            <TableCell title={review?.product?.title}>
              {truncateText(review?.product?.title, 30)}
            </TableCell>

            <TableCell className="flex items-center">
              {Array.from({ length: 5 }, (_, index) =>
                index < (review?.ratings || 0) ? (
                  <FaStar key={index} className="text-yellow-300" />
                ) : (
                  <FaRegStar key={index} className="text-gray-300" />
                )
              )}
            </TableCell>
            <TableCell>
              <span
                title={review?.title}
                className="text-xs capitalize font-semibold"
              >
                {" "}
                {truncateText(review.title, 30)}
              </span>
            </TableCell>
            <TableCell>
              <span
                title={review?.message}
                className="text-xs capitalize font-semibold"
              >
                {" "}
                {truncateText(review.message, 40)}
              </span>
            </TableCell>

            <TableCell>
              {review.createdAt !== undefined && (
                <span className="text-sm font-semibold">
                  {dayjs(review?.createdAt).format("MMMM D, YYYY")}
                </span>
              )}
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {review.status === "block" ? "block" : "active"}
              </span>
            </TableCell>

            

            <TableCell>
              <ShowHideButton id={review.id} status={review.status} />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={review.id}
                title={review.title}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                action={false}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default React.memo(ReviewsTable);
