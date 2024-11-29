const DicomViewer = () => {
  return (
    <>
      <div className=" Tools  w-screen  h-12   bg-[#ececec]  dark:bg-[#202020]  mt-16 ">
        <h1>asfdasdf</h1>
      </div>
      <div className="dark:text-white w-screen h-auto flex justify-between items-center  ">
        <div className=" Meta_Data w-[17%] flex justify-between ">
         
          <div className="flex flex-col w-full   p-5 ">
            <p>Meta Data</p>
            <hr className="border-[#cbcbcb] dark:border-[#383838]" ></hr>
          </div>

          <div className="w-px h-[calc(100vh-112px)] bg-[#cbcbcb] dark:bg-[#383838]"></div>
        </div>
       


        <div className=" Dicom_Viewer  w-[70%]">
          <h1 className="text-4xl text-center font-bold mt-10">Dicom Viewer</h1>
        </div>
      </div>
    </>
  );
};

export default DicomViewer;
