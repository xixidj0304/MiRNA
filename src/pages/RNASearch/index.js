import React, { useState, useRef, useContext, useEffect } from "react";
import { ToastContext } from "../../App";
import { useNavigate } from "react-router-dom";

import {
  GetMirnaFuzzySearchName,
  axiosInstance as axios,
} from "../../utils/mapPath";
import { CSSTransition } from "react-transition-group";
import { SearchSvg } from "../../svg";
import mirnaName from "../../data/mirnaName";
import img1 from "../../img/img17.jpg";
import img4 from "../../img/img36.jpg";
import img5 from "../../img/img25.jpg";
import img6 from "../../img/img26.jpg";
import img7 from "../../img/img24.jpg";
import img8 from "../../img/img22.jpg";
import img10 from "../../img/img30.jpg";
import { useDebounce } from "../../utils/tools";

export default function RNASearch() {
  const [showAntimation, setShowAntimation] = useState(false);
  const nodeRef = useRef(null);
  useEffect(() => {
    setShowAntimation(true);
  }, []);
  const navigate = useNavigate();
  const searchInput = useRef(null);
  const mirnaSelectList = mirnaName();
  const toastController = useContext(ToastContext);
  const [fuzzySearchList, setFuzzySearchList] = useState([]);

  const GetMirnaFuzzy = async (MirnaName) => {
    let options = {
      url: GetMirnaFuzzySearchName,
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      params: {
        MirnaName: MirnaName,
      },
    };

    let res = await axios(options);
    if (res.data.code === "0") {
      setFuzzySearchList(res.data.data);
    } else {
      toastController({
        mes: res.data.message,
        timeout: 1000,
      });
    }
  };

  const fuzzySearch = () => {
    let searchName = searchInput.current.value;
    GetMirnaFuzzy(searchName);
  };

  const handleSearchInputChange = useDebounce(fuzzySearch, 1000);

  const handleInputEnter = (event) => {
    if (searchInput.current.value === "") return;
    if (event.keyCode === 13) {
      navigate(`/RNAVisualization/${searchInput.current.value}`);
    }
  };

  return (
    <CSSTransition
      in={showAntimation}
      timeout={300}
      nodeRef={nodeRef}
      classNames="page"
      unmountOnExit
    >
      <div
        className="h-full w-full flex justify-center items-center"
        style={{
          backgroundColor: "#cfe9ed",
          // backgroundImage: `url(${img6})`,
          // backgroundRepeat: "none",
          // backgroundSize: "cover",
          // backgroundPosition: "center",
        }}
      >
        {/* 左边粉色背景容器 */}
        <div
          className="h-full w-full md:w-fit overflow-y-scroll px-2 py-5 bg-opacity-60
       bg-red-50 ss:px-8 sm:px-12 cursor-default z-10"
        >
          {/* 搜索选项栏 */}
          <div
            className="h-full w-full md:w-64 xl:w-72 overflow-y-scroll 
      bg-gray-50 bg-opacity-50 mx-auto rounded"
          >
            {/* 顶部input */}
            <div
              className="h-12 py-2 px-2 w-full sticky top-0 flex justify-start
                items-center bg-red-200 "
            >
              {/* 输入框和模塑搜索选项列表 */}
              <div className="h-full w-5/6 relative">
                <input
                  type="text"
                  placeholder="miRNA name"
                  className="h-full w-full rounded px-2"
                  ref={searchInput}
                  onChange={handleSearchInputChange}
                  onKeyUp={handleInputEnter}
                  onBlur={() => {
                    setTimeout(() => {
                      setFuzzySearchList(null);
                    }, 1500);
                  }}
                />
                {/* 模糊搜索 */}
                {fuzzySearchList !== null &&
                  fuzzySearchList !== undefined &&
                  fuzzySearchList.length > 0 && (
                    <div
                      className="h-fit w-full max-h-72 absolute top-8 rounded border-2 
                border-blue-200 overflow-y-scroll bg-gray-50"
                    >
                      <ul
                        className="h-fit w-full flex-shrink-0 rounded border-2 border-blue-200
                text-gray-600 shadow p-0"
                      >
                        {fuzzySearchList.map((fuzzyItem) => {
                          return (
                            <li
                              key={fuzzyItem.name}
                              className="h-fit w-full z-50 flex px-5 justify-start items-center hover:bg-gray-100
                        border-b-2 border-gray-300 cursor-pointer"
                              onClick={() => {
                                searchInput.current.value = fuzzyItem.name;
                                navigate(`/RNAVisualization/${fuzzyItem.name}`);
                              }}
                            >
                              {fuzzyItem.name}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
              </div>
              <div
                className="h-full flex-grow ml-2 flex justify-center items-center bg-gray-50 rounded"
                onClick={() => {
                  if (searchInput.current.value === "") return;
                  navigate(`/RNAVisualization/${searchInput.current.value}`);
                }}
              >
                <SearchSvg></SearchSvg>
              </div>
            </div>
            {/* 点击选项列表 */}
            {mirnaSelectList !== null &&
              mirnaSelectList !== undefined &&
              mirnaSelectList.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="h-9 w-full px-2 text-lg py-1 border-b-2 border-gray-100
                 bg-gray-50 bg-opacity-90 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate(`/RNAVisualization/${item.name}`);
                    }}
                  >
                    {item.name}
                  </div>
                );
              })}
          </div>
        </div>

        {/* 右边推荐选项 */}
        <div
          ref={nodeRef}
          className="hidden h-full px-8 py-20 w-2/3 font-bold 
       md:grid grid-flow-row grid-cols-4 grid-rows-3 justify-center items-start
        gap-3 md:gap-7 lg:gap-8 lg:px-12 lg:py-32 xl:gap-12 xl:px-16 xl:py-32"
        >
          {/* 跳转图片1 长*/}
          <div
            className="h-full w-full col-span-1 row-span-2 rounded border-8 border-gray-50
          hover:scale-105 transition-all duration-500 p-2"
            style={{
              backgroundImage: `url(${img8})`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              navigate(`/RNAVisualization/hsa-mir-557`);
            }}
          >
            <p
              className="text-white text-2xl"
              style={{ writingMode: "vertical-rl" }}
            >
              hsa-mir-557
            </p>
          </div>
          {/* 跳转图片2 小*/}
          <div
            className="h-full w-full col-span-1 row-span-1 rounded border-8 border-gray-50
          hover:scale-105 transition-all duration-500 p-2"
            style={{
              backgroundImage: `url(${img4})`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              navigate(`/RNAVisualization/hsa-mir-621`);
            }}
          >
            <p className="text-gray-50 text-lg">hsa-mir-621</p>
          </div>
          {/* 跳转图片3 宽*/}
          <div
            className="h-full w-full col-span-2 row-span-1 rounded border-8 border-gray-50
          hover:scale-105 transition-all duration-500 p-2 relative"
            style={{
              backgroundImage: `url(${img5})`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              navigate(`/RNAVisualization/hsa-mir-1825`);
            }}
          >
            <p className="text-white text-4xl absolute bottom-3 left-4">
              hsa-mir-1825
            </p>
          </div>
          {/* 跳转图片4 大正方形*/}
          <div
            className="h-full w-full col-span-2 row-span-2 rounded border-8 border-gray-50
          hover:scale-105 transition-all duration-500 p-3 relative"
            style={{
              backgroundImage: `url(${img1})`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              navigate(`/RNAVisualization/hsa-mir-421`);
            }}
          >
            <p className="text-gray-700 text-5xl absolute bottom-8 left-5">
              hsa-mir-421
            </p>
          </div>
          {/* 跳转图片5 长*/}
          <div
            className="h-full w-full col-span-1 row-span-2 rounded border-8 border-gray-50
          hover:scale-105 transition-all duration-500 p-2"
            style={{
              backgroundImage: `url(${img10})`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              navigate(`/RNAVisualization/hsa-mir-544a`);
            }}
          >
            <p
              className="text-white text-2xl"
              style={{ writingMode: "vertical-rl" }}
            >
              hsa-mir-544a
            </p>
          </div>
          {/* 跳转图片6 小*/}
          <div
            className="h-full w-full col-span-1 row-span-1 rounded border-8 border-gray-50
          hover:scale-105 transition-all duration-500 p-2"
            style={{
              backgroundImage: `url(${img7})`,
              backgroundRepeat: "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => {
              navigate(`/RNAVisualization/hsa-mir-636`);
            }}
          >
            <p className="text-white text-lg">hsa-mir-636</p>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}
