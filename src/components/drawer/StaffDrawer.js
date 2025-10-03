import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Card, CardBody, Input } from '@windmill/react-ui';

import Title from '../form/Title';
import Error from '../form/Error';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import SelectRole from '../form/SelectRole';
import DrawerButton from '../form/DrawerButton';
import Uploader from '../image-uploader/Uploader';
import useStaffSubmit from '../../hooks/useStaffSubmit';

const StaffDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    imageUrl,
    setImageUrl,
    selectedDate,
    setSelectedDate,
  } = useStaffSubmit(id);

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Staff"
            description="Updated your staff necessary information from here"
          />
        ) : (
          <Title
            title="Add Staff"
            description="Add your staff necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <Card className="overflow-y-scroll flex-grow scrollbar-hide w-full max-h-full">
          <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
               

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Name" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Staff name"
                    />
                    <Error errorName={errors.name} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Email" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Email"
                      name="email"
                      type="text"
                      pattern={
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
                      }
                      placeholder="Email"
                    />
                    <Error errorName={errors.email} />
                  </div>
                </div>

                 {
                  id &&
                   <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Old Password" />
                  <div className="col-span-8 sm:col-span-4">
                   
                      <InputArea
                      required
                        register={register}
                        label="Old Password"
                        name="oldPassword"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Old Password"
                      />
                 

                    <Error errorName={errors.oldPassword} />
                  </div>
                </div>
                }

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Password" />
                  <div className="col-span-8 sm:col-span-4">
                    {id ? (
                      <InputArea
                        required
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Password"
                      />
                    ) : (
                      <InputArea
                        register={register}
                        label="Password"
                        name="password"
                        type="password"
                        autocomplete="new-password"
                        placeholder="Password"
                      />
                    )}

                    <Error errorName={errors.password} />
                  </div>
                </div>
               

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Contact Number" />
                  <div className="col-span-8 sm:col-span-4">
                    <InputArea
                      register={register}
                      label="Contact Number"
                      name="phone"
                      pattern={/^[+]?\d*$/}
                      minLength={6}
                      maxLength={15}
                      type="text"
                      placeholder="Phone number"
                    />
                    <Error errorName={errors.phone} />
                  </div>
                </div>

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Joining Date" />
                  <div className="col-span-8 sm:col-span-4">
                    <Input
                      onChange={(e) => setSelectedDate(e.target.value)}
                      label="Joining Date"
                      name="joiningDate"
                      value={selectedDate}
                      type="date"
                      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
                      placeholder="Staff Joining Date"
                    />
                    <Error errorName={errors.joiningDate} />
                  </div>
                </div>

                
              </div>

              <DrawerButton id={id} title="Staff" />
            </form>
          </CardBody>
        </Card>
      </Scrollbars>
    </>
  );
};

export default StaffDrawer;
