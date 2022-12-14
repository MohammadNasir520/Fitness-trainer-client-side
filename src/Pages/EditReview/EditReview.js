import { data } from 'autoprefixer';
import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import useTittle from '../../Hooks/Hooks';

const EditReview = () => {

  useTittle('EditReview')
   const specificReviw=useLoaderData()
 
const handleEdit=event=>{

    event.preventDefault();
    const review = event.target.Reviews.value;

    
    const reviews = {
     
      review
    
    };

    fetch(`https://assignmint-11-server.vercel.app/reviews/${specificReviw._id}`,{
        method: 'PUT',
        headers:{
            'content-type': 'application/json'
        },
        body: JSON.stringify(reviews)

    })
    .then(res=>res.json())
    .then(data=>{
      if(data.matchedCount || data.modifiedCount){
        toast('review edited successfully')
      }
      
      console.log(data)})

}

    
    return (
        <div className="my-10 p-4 bg-red-100">
        <form
        onSubmit={handleEdit}
          className="flex flex-col gap-4 w-1/2 mx-auto"
        >
          <div>
            <div className="mb-2 block">
              <Label htmlFor="Reviews" value="Services Reviews" />
            </div>
            <TextInput
              id="Reviews"
              name="Reviews"
              type="text"
              defaultValue={specificReviw.review}
              placeholder="Edit Your Review"
              required={true}
            />
          </div>
  
     
  
          <Button type="submit">Edit  Reviews</Button>
        </form>
      </div>
    );
};

export default EditReview;