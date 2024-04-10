"use client";
import { IconSearch } from "@/components/icons";
import { FilterOutlined } from "@ant-design/icons";
import Image from "next/image";
import { useRef } from "react";
export default function Home() {
  const ref = useRef<any>(null);
  const showModal = () => {
    ref.current.showModal();
  };
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between">
        <div className="px-5 rounded-lg bg-grayf4 flex items-center gap-2 h-[38px] w-[550px] border">
          <IconSearch />
          <input
            type="text"
            placeholder="Search"
            className="w-full font-normal bg-transparent outline-none text-primary placeholder:text-gray80"
          />
          <div className="cursor-pointer" onClick={showModal}>
            <FilterOutlined className="w-4 h-4" />
          </div>
          <dialog ref={ref} id="my_modal_2" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Hello!</h3>
              <p className="py-4">Press ESC key or click outside to close</p>
            </div>
            <form method="dialog" className="modal-backdrop">
              <button>close</button>
            </form>
          </dialog>
        </div>
        <div className="flex justify-end gap-3">
          <button className="btn join-item bg-primary text-white hover:bg-black">
            Active
          </button>
          <button className="btn join-item">Deactive</button>
        </div>
      </div>

      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <Image
                      src="https://vcdn-giaitri.vnecdn.net/2013/12/07/John-Lennon-7519-1386386749.jpg"
                      alt="Avatar Tailwind CSS Component"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Hart Hagerty</div>
                  <div className="text-sm opacity-50">United States</div>
                </div>
              </div>
            </td>
            <td>
              Zemlak, Daniel and Leannon
              <br />
              <span className="badge badge-ghost badge-sm">
                Desktop Support Technician
              </span>
            </td>
            <td>
              <div className="badge badge-success gap-2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                active
              </div>
            </td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          {/* row 2 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <Image
                      src="https://kelvinokaforart.com/wp-content/uploads/2023/01/Bob-Dylan.jpg"
                      alt="Avatar Tailwind CSS Component"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Brice Swyre</div>
                  <div className="text-sm opacity-50">China</div>
                </div>
              </div>
            </td>
            <td>
              Carroll Group
              <br />
              <span className="badge badge-ghost badge-sm">Tax Accountant</span>
            </td>
            <td>
              <div className="badge badge-error gap-2 text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-4 h-4 stroke-current"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                deactive
              </div>
            </td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          {/* row 3 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <Image
                      src="https://ca-times.brightspotcdn.com/dims4/default/4a29742/2147483647/strip/true/crop/2048x1383+0+0/resize/1200x810!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F7a%2Fe9%2F9c323f0d724364d7f3ed5dc43e31%2Fla-et-ms-kurt-cobain-19940409-001"
                      alt="Avatar Tailwind CSS Component"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Marjy Ferencz</div>
                  <div className="text-sm opacity-50">Russia</div>
                </div>
              </div>
            </td>
            <td>
              Rowe-Schoen
              <br />
              <span className="badge badge-ghost badge-sm">
                Office Assistant I
              </span>
            </td>
            <td></td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
          {/* row 4 */}
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox checkbox-primary" />
              </label>
            </th>
            <td>
              <div className="flex items-center gap-3">
                <div className="avatar">
                  <div className="mask mask-squircle w-12 h-12">
                    <Image
                      src="https://vcdn-giaitri.vnecdn.net/2013/12/07/John-Lennon-7519-1386386749.jpg"
                      alt="Avatar Tailwind CSS Component"
                      width={160}
                      height={160}
                    />
                  </div>
                </div>
                <div>
                  <div className="font-bold">Yancy Tear</div>
                  <div className="text-sm opacity-50">Brazil</div>
                </div>
              </div>
            </td>
            <td>
              Wyman-Ledner
              <br />
              <span className="badge badge-ghost badge-sm">
                Community Outreach Specialist
              </span>
            </td>
            <td>Indigo</td>
            <th>
              <button className="btn btn-ghost btn-xs">details</button>
            </th>
          </tr>
        </tbody>
        {/* foot */}
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
      <div className="join flex justify-center">
        <button className="join-item btn">1</button>
        <button className="join-item btn btn-active">2</button>
        <button className="join-item btn">3</button>
        <button className="join-item btn">4</button>
      </div>
    </div>
  );
}
