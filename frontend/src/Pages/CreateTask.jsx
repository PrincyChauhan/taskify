import React from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const CreateTask = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-row justify-between">
        <Sidebar />

        <div className="flex flex-col items-center justify-center p-10 w-full h-[100%] font-poppins">
          <div className="bg-while p-8 rounded-lg shadow-lg  w-[45%] h-full ">
            <h2 className="text-3xl font-bold text-center mb-3 text-[#0C0950]">
              Create Task
            </h2>

            <form className="w-full h-full">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tittle
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  type="text"
                  id="description"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  DueDate
                </label>
                <input
                  type="date"
                  name="duedate"
                  id="duedate"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Assigned To:
                </label>
                <input
                  type="text"
                  name="AssignedTo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Subtasks:
                </label>

                <div className="mb-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="Subtask Title"
                    className="w-full px-4 py-2 mb-2 border border-gray-300 rounded-md"
                  />
                  <textarea
                    name="description"
                    placeholder="Subtask description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                  ></textarea>
                  <button type="button" className="text-red-500 mt-2">
                    Remove Subtask
                  </button>
                </div>

                <button type="button" className="text-[#0C0950]">
                  Add Subtask
                </button>
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-[#0C0950] text-white font-semibold rounded-lg hover:bg-[#161179] focus:outline-none"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
