import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <>
      <div className="">Welcome to Leetcode Dashboard</div>
      <SignIn />
    </>
  );
}
