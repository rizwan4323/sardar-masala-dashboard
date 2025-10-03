import React from 'react';
import * as dayjs from 'dayjs';
import { TableCell, TableBody, TableRow } from '@windmill/react-ui';
import Status from '../table/Status';

const OrderTable = ({ orders }) => {
  // console.log(orders?.orders);
  return (
    <>
      <TableBody>
        {orders?.orders?.map((order) => (
          <TableRow key={order.id}>
            <TableCell>
              <span className="text-sm">
                {dayjs(order.createdAt).format('MMM D, YYYY')}
              </span>
            </TableCell>

            <TableCell>
               <span className="text-sm ">{order.user.address}</span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm">{order.user.phone}</span>{' '}
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">
                {order.paymentMethod}
              </span>
            </TableCell>
            <TableCell>
              {' '}
              <span className="text-sm font-semibold">
                Rs {Math.round(order.totalPrice)}
              </span>{' '}
            </TableCell>
            <TableCell>
              <Status status={order.status} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default OrderTable;
