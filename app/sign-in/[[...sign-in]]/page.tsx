import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function Page() {
   return (
      <section className="flex justify-center mt-5 pt-10">
         <SignIn
            appearance={{
               baseTheme: dark,
               layout: {
                  logoImageUrl:
                     "/assets/icons/logo.svg",
               },
               variables: {
                  colorPrimary: "#f66666",
               },
            }}

         />
      </section>
   );
}
