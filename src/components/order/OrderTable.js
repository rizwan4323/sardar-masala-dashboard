import React from "react";
import { TableCell, TableBody, TableRow } from "@windmill/react-ui";
import useToggleDrawer from "../../hooks/useToggleDrawer";
import Status from "../table/Status";
import SelectStatus from "../form/SelectStatus";
import EditDeleteButton from "../table/EditDeleteButton";
import MainModal from "../modal/MainModal";
import { Link } from "react-router-dom";
import Tooltip from "../tooltip/Tooltip";
import { FiZoomIn } from "react-icons/fi";

const OrderTable = ({ orders }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  // console.log(">>>>> ", orders);
  return (
    <>
      <MainModal id={serviceId} title={title} />
      <TableBody>
        {orders?.map((order, i) => (
          <TableRow key={order.id}>
            <TableCell>
              <span className="font-semibold uppercase text-xs">
                #on{order.id}
              </span>
            </TableCell>
             

            <TableCell>
              <span className="text-sm ">
                {order?.items.length > 2
                  ? order?.items
                      .slice(0, 3)
                      .map((item, i) => item?.productDetails?.title)
                      .join(", ") + "..."
                  : order?.items
                      .map((item, i) => item?.productDetails?.title)
                      .join(", ")}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm"> Rs {Math.round(order.totalPrice)}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm"> {order.user.phone}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm"> {order.user.email}</span>
            </TableCell>

            <TableCell className="text-center text-xs">
              <Status status={order.status} />
            </TableCell>

            <TableCell className="text-center">
              <SelectStatus id={order.id} order={order} />
            </TableCell>

            <TableCell className="text-right flex justify-end">
              <div className="p-2 cursor-pointer text-gray-400 hover:text-green-600">
                {" "}
                <Link to={`/order/${order.id}`}>
                  <Tooltip
                    id="view"
                    Icon={FiZoomIn}
                    title="View Invoice"
                    bgColor="#34D399"
                  />
                </Link>
              </div>
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={order.id}
                title={order.id}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                // action="orderAction"
                action={false}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
