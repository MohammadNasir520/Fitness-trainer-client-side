import { Button, Card } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const MyReviewCard = ({ myreview, handleDelete }) => {
  const { image, userName, email, review, _id, serviceName } = myreview;

  console.log(myreview);

  return (
    <div>
      <Card>
        <div>
          <p>{review}</p>
        </div>

        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="pt-3 pb-0 sm:pt-4">
              <div className="flex items-center space-x-4">
                <div className="shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={image}
                    alt="Revivewer img"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                    {userName}
                  </p>
                  <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                    {email}
                  </p>
                </div>

                    <div>
                        <p>Service Name: {serviceName}</p>
                    </div>

                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Link to={`/editReview/${_id}`}>
                    {" "}
                    <div>
                      <Button gradientMonochrome="cyan">Edit</Button>
                    </div>
                  </Link>
                </div>
                <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  <Link>
                    {" "}
                    <div>
                      <Button
                        onClick={() => handleDelete(_id)}
                        gradientMonochrome="cyan"
                      >
                        Delete Review
                      </Button>
                    </div>
                  </Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default MyReviewCard;