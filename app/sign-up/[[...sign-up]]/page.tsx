import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="">
      Welcome to Leetcode Dashboard
      <SignUp />
    </div>
  );
}
