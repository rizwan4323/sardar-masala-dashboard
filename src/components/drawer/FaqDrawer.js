import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import add from '../../assets/img/add.png'

import Title from '../form/Title';
import Error from '../form/Error';
import LabelArea from '../form/LabelArea';
import InputArea from '../form/InputArea';
import DrawerButton from '../form/DrawerButton';
import useFaqSubmit from './../../hooks/useFaqSubmit';


const FaqDrawer = ({ id }) => { 

  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
  } = useFaqSubmit(id);



  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title="Update Faq"
            description="Updated your product and necessary information from here"
          />
        ) : (
          <Title
            title="Add Faq"
            description="Add your faq and necessary information from here"
          />
        )}
      </div>
      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)} className="block">
          <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
           

           
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6 ">
              <LabelArea label="Question" />
              <div className="col-span-8 sm:col-span-4 ">
                <InputArea
                  register={register}
                  label="Question"
                  name="question"
                  type="text"
                  placeholder="Enter main heading"
                 
                />
               
                <Error errorName={errors.title} />
              </div>
            </div>


        

            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label="Answer" />
              <div className="col-span-8 sm:col-span-4 relative">
              <InputArea
                  register={register}
                  label="Answer"
                  name="answer"
                  type="text"
                  placeholder="Enter Description"
                 
                />
                 <img src={add} className='custom-icon' alt='faq' />
                <Error errorName={errors.title} />
              </div>
            </div>

          

            
          </div>

          <DrawerButton id={id} />
        </form>
      </Scrollbars>
    </>
  );
};

export default React.memo(FaqDrawer);
