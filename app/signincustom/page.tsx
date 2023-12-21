'use client';
import { useState } from 'react';
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from 'next/navigation';

const Signin = () => {
   const { isLoaded, signIn, setActive } = useSignIn();
   const [emailAddress, setEmailAddress] = useState("");
   const [password, setPassword] = useState("");
   const router = useRouter();

   // start the sign In process.
   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isLoaded) {
         return;
      }

      try {
         const result = await signIn.create({
            identifier: emailAddress,
            password,
         });

         if (result.status === "complete") {
            console.log(result);
            await setActive({ session: result.createdSessionId });
            router.push("/")
         }
         else {
            /*Investigate why the login hasn't completed */
            console.log(result);
         }

      } catch (err: any) {
         console.error("error", err.errors[0].longMessage)
      }
   };

   return (
      <div className='border p-5 rounded' style={{ width: '500px' }}>
         <h1 className='text-2xl mb-4'>Register</h1>

         <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <div>
               <label
                  htmlFor='email'
                  className='block mb-2 text-sm font-medium text-gray-900'
               >
                  Email Address
               </label>
               <input
                  type='email'
                  name='email'
                  id='email'
                  onChange={(e) => setEmailAddress(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5'
                  placeholder='name@company.com'
                  required={true}
               />
            </div>
            <div>
               <label
                  htmlFor='password'
                  className='block mb-2 text-sm font-medium text-gray-900'
               >
                  Password
               </label>
               <input
                  type='password'
                  name='password'
                  id='password'
                  onChange={(e) => setPassword(e.target.value)}
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5'
                  required={true}
               />
            </div>
            <button
               type='submit'
               className='w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            >
               Create an account
            </button>
         </form>
      </div>
   );
};

export default Signin;
