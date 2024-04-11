import { isDisabled } from "@testing-library/user-event/dist/utils";
import { useFormik } from "formik";
import React, { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

const BuyTicket = ({ maLichChieu }) => {
  //Call api
  const { listBeingSelectedChair, filmInformation } = useSelector(
    (state) => state.movieSlice
  );
  console.log(listBeingSelectedChair);
  const { infoUser } = useSelector((state) => state.userReducer);
  const acceptTicket = useFormik({
    initialValue: {
      maLichChieu: maLichChieu,
      danhSachVe: { listBeingSelectedChair },
    },
  });

  //main function
  const fetchListBeingSelectedChair = () => {
    let listChair = "Chair: ";
    listBeingSelectedChair?.map((chair, i) => {
      if (i == 0) {
        listChair = listChair + `${chair.stt} (${chair.loaiGhe})`;
      } else {
        listChair = listChair + ` ; ${chair.stt} (${chair.loaiGhe})`;
      }
    });
    if (listBeingSelectedChair.length) {
      console.log("yes");
    } else console.log("no");
    if (listChair.length > 191) {
      return listChair.substring(0, 190) + " ...";
    } else return listChair;
  };
  const sumOfMoney = () => {
    let sum = 0;
    listBeingSelectedChair?.map((chair, i) => {
      sum = sum + chair.giaVe;
    });
    return sum;
  };

  // main fecth
  return (
    <div
      className="w-3/5 h-5/6 mt-3 p-2 rounded-md"
      style={{ backgroundColor: "#0a2029" }}
    >
      <div className="h-[80%] text-white">
        <div className="text-center text-[1.5rem]">Thông tin vé</div>
        <div className="pb-2 mb-2 h-[92%]">
          <div className="bg-white h-full text-black py-2 px-8  rounded-t-lg">
            <p className="text-[1.2rem] font-bold">
              Phim: {filmInformation.tenPhim}
            </p>

            {/* Thời gian  */}
            <div className="pt-4">
              <p className=" font-bold">
                <i class="fa-solid fa-clock"></i> Thời gian
              </p>
              <p>
                {filmInformation.gioChieu} ~ {filmInformation.ngayChieu}
              </p>
            </div>

            {/* Tên rạp  */}
            <div className="pt-4">
              <p className=" font-bold">
                <i class="fa-solid fa-video"></i> Rạp
              </p>
              <p>{filmInformation.tenRap}</p>
            </div>
            {/* Địa chỉ  */}
            <div className="pt-4">
              <p className=" font-bold">
                <i class="fa-solid fa-video"></i> Địa chỉ
              </p>
              <p>{filmInformation.diaChi}</p>
            </div>

            {/* Số ghế đã đặt   */}
            <div className="pt-4">
              <p className=" font-bold">
                <i class="fa-solid fa-couch"></i> Số ghế đã chọn
              </p>
              <p>{fetchListBeingSelectedChair()}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[20%] rounded-b-lg bg-white py-2">
        <div className="grid grid-cols-6 gap-4">
          <div className="px-8 w-70 col-span-4">
            <div className="text-[1.2rem] font-bold">Tên: {infoUser.hoTen}</div>
            <div className="text-[1.5rem] font-bold text-orange-500">
              Tổng cộng:{" "}
            </div>
            <div className="font-bold">{sumOfMoney()} vnd</div>
          </div>
          <div className="py-4">
            <button
              onClick={() => {
                acceptTicket();
              }}
              className={`py-2 px-8 border rounded-2xl bg-red-500 font-bold text-[1.2rem] transition ease-in-out text-white hover:bg-red-700
              ${listBeingSelectedChair.length ? "" : "cursor-not-allowed"}
              `}
            >
              Đặt
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyTicket;
