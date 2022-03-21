import React from "react";

const Modal = () => {
  return (
    <div
      className="min-w-screen animated fadeIn faster fixed  inset-0  left-0 top-0 z-50 flex h-screen items-center justify-center bg-cover bg-center bg-no-repeat outline-none focus:outline-none"
      //   style="background-image: url(https://images.unsplash.com/photo-1623600989906-6aae5aa131d4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1582&q=80);"
      id="modal-id"
    >
      <div className="absolute inset-0 z-0 bg-black opacity-80"></div>
      <div className="relative  mx-auto my-auto w-full max-w-lg rounded-xl bg-white p-5  shadow-lg ">
        <div className="">
          <div className="flex-auto justify-center p-5 text-center">
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              className="-m-1 mx-auto flex h-4 w-4 items-center text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mx-auto flex h-16 w-16 items-center text-red-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg> */}
            <h2 className="py-4 text-xl font-bold ">Are you sure?</h2>
            <p className="px-8 text-sm text-gray-500">
              Do you really want to delete your account? This process cannot be
              undone
            </p>
          </div>

          <div className="mt-2  space-x-4 p-3 text-center md:block">
            <button className="mb-2 rounded-full border bg-white px-5 py-2 text-sm font-medium tracking-wider text-gray-600 shadow-sm hover:bg-gray-100 hover:shadow-lg md:mb-0">
              Cancel
            </button>
            <button className="mb-2 rounded-full border border-red-500 bg-red-500 px-5 py-2 text-sm font-medium tracking-wider text-white shadow-sm hover:bg-red-600 hover:shadow-lg md:mb-0">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
