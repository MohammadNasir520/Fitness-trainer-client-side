import { GoogleAuthProvider } from "firebase/auth";
import { Spinner } from "flowbite-react";
import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import useTittle from "../../Hooks/Hooks";

const Login = () => {

  //dynamic title add
  useTittle("Login");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const { signInViaEmailAndPassword, signInByGoogle, loading } =
    useContext(AuthContext);


    // spinner added
  if (loading) {
    return (
      <div className="text-center mt-6">
        <Spinner color="success" aria-label="Success spinner example" />
      </div>
    );
  }

  const googleProvider = new GoogleAuthProvider();


//collecting data from form and login implement function
  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    console.log(email, password);

// sign in by email and password
    signInViaEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);

        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);

        //get and set  jwt token 
        fetch("https://assignmint-11-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(currentUser),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
           localStorage.setItem('fitness-trainerToken',data.token)
           navigate(from,{replace: true});
          });
      })

      .catch((err) => {
        console.log(err);
      });
  };

  //gogle sign in authentication
  const HandleSignInWithGoogle = () => {
    signInByGoogle(googleProvider)
      .then((result) => {
        const user = result.user;
        console.log(user);



        const currentUser = {
          email: user.email,
        };
        console.log(currentUser);
        
           //get and set  jwt token 
           fetch("https://assignmint-11-server.vercel.app/jwt", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(currentUser),
          })

          .then((res) => res.json())
          .then((data) => {
            console.log(data);
           localStorage.setItem('fitness-trainerToken',data.token)
           navigate(from,{replace: true});
          });

        // navigate(from, { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="w-full max-w-md p-8 space-y-3 rounded-xl mx-auto ">
        <h1 className="text-2xl font-bold text-center">SignIn</h1>
        <form
          onSubmit={handleLogin}
          className="space-y-6 ng-untouched ng-pristine ng-valid"
        >
          <div className="space-y-1 text-sm">
            <label htmlFor="username" className="block">
              Username
            </label>
            <input
              type="text"
              name="email"
              id="username"
              placeholder="Username"
              className="w-full px-4 py-3 rounded-md"
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="password" className="block ">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-md"
            />
            <div className="flex justify-end text-xs"></div>
          </div>
          <button className="btn bg-emerald-700 w-full p-3 text-center rounded-sm">
            Sign in
          </button>
        </form>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16"></div>
          <p className="px-3 text-sm ">SignIn with Google</p>
          <div className="flex-1 h-px sm:w-16"></div>
        </div>
        <div className="flex justify-center space-x-4">
          <button aria-label="Log in with Google" className="p-3 rounded-sm">
            <svg
              onClick={HandleSignInWithGoogle}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              className="w-5 h-5 fill-current"
            >
              <path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
            </svg>
          </button>
        </div>
        <p className="text-xs text-center sm:px-6">
          Don't have an account?
          <Link to="/signup" className="underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
