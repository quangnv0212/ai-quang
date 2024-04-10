import Link from "next/link";
import IcMailSuccess from "@/assets/images/mail-success.svg";

export default function MailSuccessPage() {
  return (
    <div className="flex flex-col items-center h-screen">
      <img src={IcMailSuccess.src} className="w-1/2" alt="" />
      <div className="text-center">
        <div className="text-34-34 font-bold">Successfully Registered</div>
        <div className="text-black-6 mt-5 mb-6 text-16-24 font-visby px-[120px]">
          Thank you for registering! We've sent an activation link to the email
          address you provided. Please check your inbox and follow the
          instructions to activate your account.If you don't receive the email
          within a few minutes, please check your spam folder. If you encounter
          any issues, feel free to contact our support team for assistance.
        </div>
        <Link
          className="btn bg-primary text-white hover:bg-black"
          href="/login"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
}
