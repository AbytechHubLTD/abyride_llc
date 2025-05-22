import React, { useState } from 'react'
import inside1 from '../../../../assets/carimages/inside1.jpeg'
import inside2 from '../../../../assets/carimages/inside2.png'
import inside3 from '../../../../assets/carimages/inside3.jpeg'
import inside4 from '../../../../assets/carimages/inside4.jpeg'

import frontside from '../../../../assets/carimages/frontside.jpg'
import leftside from '../../../../assets/carimages/leftside.jpg'
import rightside from '../../../../assets/carimages/rightside.jpg'
import backside from '../../../../assets/carimages/backside.jpg'
import { ArrowLeft, ArrowLeftCircle, CheckCircleIcon, ChevronLeft, XCircleIcon } from 'lucide-react'
const innerImagesExample = [
  inside1,
  inside2,
  inside3,
  inside4,
]
const innerTextExample = [
  'inside left photo',
  'the inside carwheel photo ',
  'inside left angle backseet shot',
  'backseet shot',
]

const outerImagesExample = [
  frontside,
  leftside,
  rightside,
  backside,
]

const outerTextExample = [
  'frontside',
  'left side ',
  'right side',
  'back side',
]

// Define size limits in bytes
const IMAGE_SIZE_LIMIT = 5 * 1024 * 1024; // 5MB for images

const CarImages = ({
  currentStep,
  setFormdata,
  setValid,
  nextStep,
  handleSubmitAllForm,
  formData,
  error,
  setError,
}) => {


  const [localCurrentStep, setLocalCurrentStep] = useState(1)
  console.log('formdata', formData);
  console.log('shit', Array.isArray(formData.outerImages) &&
    formData.outerImages.length > 0 &&
    formData.outerImages.every(data => data && data.file && data.name));




  // Function to check file size
  const checkFileSize = (file, sizeLimit, fileType) => {
    if (file.size > sizeLimit) {
      const sizeMB = (sizeLimit / (1024 * 1024)).toFixed(0);
      alert(

        `Please select a ${fileType} smaller than ${sizeMB}MB.`,

      );
      return false;
    }
    return true;
  };

  // Function to pick images
  const handlePickImage = async (e, index, section) => {
    const result = e.target.files

    console.log('result file', result);
    console.log('result index', index);
    console.log('result section', section);


    try {




      if (result.length > 0) {

        console.log('shit sjsj', result.length);




        // Create file object from image
        const imageFile = {
          file: result[0],
          preview: URL.createObjectURL(result[0]),
          name: result[0].name,
        };

        // Check size
        if (checkFileSize(imageFile, IMAGE_SIZE_LIMIT, "image")) {
          setFormdata(pre => {
            const newArray = [...pre.fifth[section]]; // clone the array
            console.log(index);

            newArray[index] = imageFile // insert at index

            return {
              ...pre,
              fifth: {
                ...pre.fifth,
                [section]: newArray
              }
            };
          });


        }
      }
    } catch (err) {
      console.error('Error picking image:', err);

    } finally {
      e.target.value = ''
    }
  };





  // step 1: choose whether you want inside and outside images
  const ElementOfChoosingOutSideOrInside = () => {
    return (
      <div className="flex flex-col pt-6 gap-10 w-full items-center justify-center ">

        <h1 className='text-lg xl:text-xl capitalize text-neutral-700'>choose either inside or outside images</h1>

        <div className="flex text-white flex-col gap-3 w-full lg:w-2/3 xl:w-1/2 ">
          <button type='button' className='p-3  capitalize w-full bg-black rounded-md' onClick={() => setLocalCurrentStep(2)} > choose inside images </button>
          <button type='button' className='p-3  capitalize w-full bg-black rounded-md' onClick={() => setLocalCurrentStep(3)} > choose outside images </button>
          <button
            type='submit'
            disabled={
              !Array.isArray(formData.outerImages) ||
              formData.outerImages.length === 0 ||
              !formData.outerImages.every(data => data?.file && data?.name) ||
              !Array.isArray(formData.innerImages) ||
              formData.innerImages.length === 0 ||
              !formData.innerImages.every(data => data?.file && data?.name)
            }
            className='p-3 capitalize w-full bg-primaryred rounded-md disabled:opacity-50'

          >
            {
              Array.isArray(formData.outerImages) &&
                formData.outerImages.length > 0 &&
                formData.outerImages.every(data => data?.file && data?.name) &&
                Array.isArray(formData.innerImages) &&
                formData.innerImages.length > 0 &&
                formData.innerImages.every(data => data?.file && data?.name)
                ? 'Now you can submit'
                : 'You need to fill up all the required images'
            }
          </button>


        </div>

      </div>
    )
  }
  // step 2: choose inside images
  const ElementForChoosingInsideImages = () => {
    return (
      <div className="flex flex-col pt-2 gap-10 w-full ">
        <div className="flex gap-4 items-center">
          <ArrowLeftCircle className='w-10 h-10 cursor-pointer' onClick={() => setLocalCurrentStep(1)} />
          <h1 className='text-lg xl:text-xl capitalize text-neutral-700'>choose  inside  images</h1>
        </div>
        <div className="flex  flex-wrap gap-5 pb-10  justify-center w-full">

          {
            innerImagesExample.map((item, index) => (
              <div className="flex flex-auto w-full xl:w-5/12 ">

                <label htmlFor={`innerImages${index}`} className='flex flex-col p-3  gap-2  h-[35vh] w-full'>
                  <div className="flex  items-center justify-between">

                    <h1 className='capitalize'> {index + 1}. {innerTextExample[index]} </h1>
                    {(formData?.innerImages[index]?.preview && formData?.innerImages[index]?.file) ?
                      (
                        <CheckCircleIcon stroke='green' size={23} />

                      ) : (
                        <XCircleIcon stroke='red' size={23} />
                      )}

                  </div>
                  <img
                    src={(formData?.innerImages[index]?.preview && formData?.innerImages[index]?.file)
                      ? formData?.innerImages[index]?.preview : item}
                    className='h-full rounded-md w-full min-h-full object-cover' alt="" />
                  {
                    (formData?.innerImages[index]?.name && formData?.innerImages[index]?.file) ?
                      <p className='text-green-600 lowercase'><span className='text-gray-700 capitalize'>Name : </span>{formData?.innerImages[index]?.name}</p>
                      : <p className='text-red-500 capitalize'>required!!</p>

                  }
                </label>

                <input type="file" id={`innerImages${index}`} hidden onChange={(e) => handlePickImage(e, index, 'innerImages')} />
              </div>
            ))
          }



        </div>
        <button
          type='button'
          className='p-3 disabled:opacity-50 capitalize w-full text-white bg-black rounded-md'
          onClick={() => setLocalCurrentStep(1)}
          disabled={
            !Array.isArray(formData.innerImages) ||
            formData.innerImages.length === 0 ||
            !formData.innerImages.every(data => data?.file && data?.name)
          }
        >
          click here to continue
        </button>

      </div>
    )
  }

  // step 3: choose outside images
  const ElementForChoosingOutSideImages = () => {
    return (
      <div className="flex flex-col pt-2 gap-10 w-full">
        <div className="flex gap-4 items-center">
          <ArrowLeftCircle className='w-10 h-10 cursor-pointer' onClick={() => setLocalCurrentStep(1)} />
          <h1 className='text-lg xl:text-xl capitalize text-neutral-700'>choose  outside images</h1>
        </div>

        <div className="flex  flex-wrap gap-5  pb-10  justify-center w-full">

          {
            outerImagesExample.map((item, index) => (
              <div key={index} className="flex flex-auto  w-full xl:w-5/12 p-2 ">

                <label htmlFor={`outsideImage${index}`} className='flex   text-black gap-2 flex-col cursor-pointer  h-[35vh] w-full'>
                  <div className="flex  items-center justify-between">

                    <h1 className='capitalize'> {index + 1}. {outerTextExample[index]} </h1>
                    {
                      (formData?.outerImages[index]?.preview && formData?.outerImages[index]?.file) ?
                        (
                          <CheckCircleIcon stroke='green' size={23} />

                        ) : (
                          <XCircleIcon stroke='red' size={23} />
                        )}
                  </div>
                  <img
                    src={(formData?.outerImages[index]?.preview && formData?.outerImages[index]?.file)
                      ? formData?.outerImages[index]?.preview : item}
                    className='h-full rounded-md w-full object-cover min-h-full' alt="" />


                  {
                    (formData?.outerImages[index]?.name && formData?.outerImages[index]?.file) ?
                      <p className='text-green-600 lowercase'><span className='text-gray-700 capitalize'>Name : </span>{formData?.outerImages[index]?.name}</p>
                      : <p className='text-red-500 capitalize'>required!!</p>

                  }
                </label>


                <input type="file" id={`outsideImage${index}`} hidden onChange={(e) => handlePickImage(e, index, 'outerImages')} />
              </div>
            ))
          }

        </div>
        <button
          type='button'
          className='p-3 disabled:opacity-50 capitalize w-full text-white bg-black rounded-md'
          onClick={() => setLocalCurrentStep(1)}
          disabled={
            !Array.isArray(formData.outerImages) ||
            formData.outerImages.length === 0 ||
            !formData.outerImages.every(data => data?.file && data?.name)
          }
        >
          click here to continue
        </button>

      </div>
    )
  }
  // Not found: show up when image not found
  const ElementForNotFoundPage = () => {
    return (
      <div className="flex text-white flex-col">
        <h1 className='text-lg xl:text-xl capitalize text-neutral-700'>this stage not found , so go back</h1>
        <button type='button' className='p-3  capitalize w-full bg-black rounded-md' onClick={() => setLocalCurrentStep(1)} > click to go back  </button>
      </div>
    )
  }


  const runLocalSteps = () => {

    switch (localCurrentStep) {

      case 1:
        return ElementOfChoosingOutSideOrInside()

      case 2:
        return ElementForChoosingInsideImages()

      case 3:
        return ElementForChoosingOutSideImages()

      default:
        return ElementForNotFoundPage()


    }

  }



  const handleSubmit = async (e) => {
    e.preventDefault()
    const isOuterValid =
      Array.isArray(formData.outerImages) &&
      formData.outerImages.length > 0 &&
      formData.outerImages.every(data => data?.file && data?.name);

    const isInnerValid =
      Array.isArray(formData.innerImages) &&
      formData.innerImages.length > 0 &&
      formData.innerImages.every(data => data?.file && data?.name);

    if (!isOuterValid || !isInnerValid) {
      return alert('All inner and outer photos are required');
    }

    try {
      await handleSubmitAllForm();
      // alert('done');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Something went wrong');
    }
  };




  return (

    <div
      className="flex flex-col min-h-[70vh] gap-3 text-center  sm:text-left bg-white p-2  md:p-9 px-14 w-full sm:w-9/12 md:w-8/12  rounded-lg justify-start items-center 
  mt-[-36px]"
    >
      <h1 className="text-xl md:text-2xl xl:text-3xl text-center capitalize">
        Step {currentStep} : Upload The Car Images


      </h1>

      {localCurrentStep}

      <form
        onSubmit={handleSubmit}
        className="flex  w-full xl:w-11/12 py-4 gap-2"
      >


        {runLocalSteps()}





      </form>


    </div>
  )
}

export default CarImages