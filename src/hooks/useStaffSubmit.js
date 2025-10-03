import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';
import { useLocation } from 'react-router';

import AdminServices from '../services/AdminServices';
import { AdminContext } from '../context/AdminContext';
import { SidebarContext } from '../context/SidebarContext';
import { notifyError, notifySuccess } from '../utils/toast';

const useStaffSubmit = (id) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
   const [selectedDate, setSelectedDate] = useState('');
  const location = useLocation();
  const { isDrawerOpen, closeDrawer, setIsUpdate } = useContext(SidebarContext);

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
    const staffData = {
      name: data.name,
      email: data.email,
      password: data.password,
      oldPassword: data.oldPassword,
      phone: data.phone,
      joiningDate: selectedDate
        ? selectedDate
        : dayjs(new Date()).format('YYYY-MM-DD'),
      // role: data.role,
      role: "Admin",
      // image: imageUrl,
    };

    if (id) {
      AdminServices.updateStaff(id, { email: adminInfo.email, data: staffData })
        .then((res) => {
          setIsUpdate(true);
          notifySuccess('Staff Updated Successfully!');
           closeDrawer();
        })
        .catch((err) => {
          console.log(">>>>>>>>>>> error --------- ", err ? err.response.data.message : err.message);
          
          notifyError(err ? err.response.data.message : err.message)
        });
        
     
    } else {
      AdminServices.addStaff({ email: adminInfo.email, data: staffData })
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
      setValue('name');
      setValue('email');
      setValue('password');
      setValue('phone');
      setValue('joiningDate');
      setValue('role');
      // setImageUrl('');
      clearErrors('name');
      clearErrors('email');
      clearErrors('password');
      clearErrors('phone');
      clearErrors('joiningDate');
      clearErrors('role');
      return;
    }
    if (id) {
      AdminServices.getStaffById(id, { email: adminInfo.email })
        .then((res) => {
          if (res) {
            setValue('name', res.name);
            setValue('email', res.email);
            setValue('password');
            // setValue('password', res.password);
            setValue('phone', res.phone);
            setValue('joiningDate', res.joiningData);
            setValue('role', res.role);
            // setImageUrl(res.image);
            // setSelectedDate(dayjs(res.joiningData).format('YYYY-MM-DD'));
          }
        })
        .catch((err) => {
          notifyError('There is a server error!');
        });
    }
  }, [id, setValue, isDrawerOpen, adminInfo.email, clearErrors]);

  useEffect(() => {
    if (
      location.pathname === '/setting' ||
      (location.pathname === '/edit-profile' && Cookies.get('adminInfo'))
    ) {
      const user = JSON.parse(Cookies.get('adminInfo'));
      setValue('name', user.name);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('role', user.role);
      // setImageUrl(user.image);
      setSelectedDate(dayjs(user.joiningData).format('YYYY-MM-DD'));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    register,
    handleSubmit,
    onSubmit,
    errors,
    // setImageUrl,
    // imageUrl,
    selectedDate,
    setSelectedDate,
  };
};

export default useStaffSubmit;
