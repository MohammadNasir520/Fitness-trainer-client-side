import { data } from "autoprefixer";
import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Link, useLoaderData } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthProvider";
import useTittle from "../../Hooks/Hooks";
import ReviewCard from "./ReviewCard";

const ServiceDetailsAndReviews = () => {
  useTittle("Service Review");

  const { user,LogOut } = useContext(AuthContext);

  //destructurin servise details
  const service = useLoaderData();
  console.log(service);
  const { image, name, price, description, _id } = service;

  // usestate for getting Customer review.
  const [reviews, setReviews] = useState([]);
  const [refresh, setrefress] = useState(false);

  //get customers review
  useEffect(() => {
    fetch(`https://assignmint-11-server.vercel.app/serviceReviews?serviceId=${_id}`,{

      headers: {
        authorization:`Bearrer ${localStorage.getItem('fitness-trainerToken')}`
       }
    })

      .then((res) =>res.json())
      .then((data) => {
        console.log(data)
        setReviews(data);
      });
  }, [refresh],_id);

  //handle input reviwe and set to mongodb
  const handleReviews = (event) => {
    event.preventDefault();
    const review = event.target.Reviews.value;

    const userName = user?.displayName;
    const email = user?.email;
    const image = user?.photoURL;
    const reviews = {
      userName,
      email,
      image,
      review,
      serviceId: _id,
      serviceName: name,
    };

    //insert review to mongo db

    fetch("https://assignmint-11-server.vercel.app/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(reviews),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast("Review added successfully");
          event.target.reset();

          setrefress(!refresh);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {/* ----------------------service details------------------------- */}
      <div className="w-ful md:w-1/2 mx-auto">
        <Card >

            {/* rect photo viewr added */}
          <PhotoProvider>
            <div className="foo">
              <PhotoView src={image}>
                <img src={image} style={{ objectFit: 'cover' }} alt="service img" />
              </PhotoView>
            </div>
          </PhotoProvider>



          <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {name}
          </h5>
          <h5 className="text-md font-semibold tracking-tight text-gray-900 dark:text-white">
            Cervice Charge : {price} tk /month
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </Card>
      </div>

      {/*---------------------- add reviews section----------------------- */}

      {user?.uid ? (
        <div className="my-10 p-4 bg-red-100">
          <form
            onSubmit={handleReviews}
            className="flex flex-col gap-4 w-1/2 mx-auto"
          >
            <div>
              <div className="mb-2 block">
                <Label
                  htmlFor="Reviews"
                  value={`Add a rview to ${name} service`}
                />
              </div>
              <TextInput
                id="Reviews"
                name="Reviews"
                type="text"
                placeholder="tell about services"
                required={true}
              />
            </div>

            <Button type="submit">Add Reviews</Button>
          </form>
        </div>
      ) : (
        <div className="text-center p-10 bg-red-100">
          <div className="text-1xl font-bold flex justify-center align-middle">
            <p>
              {" "}
              Please{" "}
              <Link className="text-green-400" to={"/login"}>
                {" "}
                SignIn
              </Link>{" "}
              to Add Review{" "}
            </p>
          </div>
        </div>
      )}

      {/* -----------show review  ---------------------------------------*/}
   

      <div>
        <div className="">
          <div className="mb-4 ">
            <h5 className="text-xl text-center font-bold leading-none text-gray-900 dark:text-white">
              Student Reviews
            </h5>
            
          </div>
         {/*  conditional rendering for no review*/}
          {
              reviews==0 &&
               <div className='w-full h-20 bg-red-100'>


                <h1 className='text-lg text-center text-semibold'>No review yet </h1>


              </div>
            }



          <div>
            {reviews.map((review) => (
              <ReviewCard key={review._id} crReview={review}></ReviewCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsAndReviews;
