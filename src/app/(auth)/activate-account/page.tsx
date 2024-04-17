import Image from "next/image";
import IcMailSuccess from "@/assets/images/mail-success.svg";
import Link from "next/link";
import { ButtonCommon } from "@/components/common/button-common";
export default function ActivatePage() {
  return (
    <div className="h-screen flex items-center justify-center px-[200px]">
      <div className="">
        <div className="flex justify-center items-center border p-10 border-gray-400 rounded-2xl bg-white ">
          <Image
            src={IcMailSuccess.src}
            className="w-1/2"
            alt=""
            width={160}
            height={160}
          />
          <div className="flex flex-col gap-4">
            <div className="text-34-34 font-bold">Activate Account</div>
            <div className="text-black-6 text-16-24 font-visby"></div>
            <ButtonCommon className="btn bg-primary text-white hover:bg-primary-hover">
              Activate account
            </ButtonCommon>
          </div>
        </div>
      </div>
    </div>
  );
}
