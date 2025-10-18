import React from "react";
import "../index.css";
import JoditEditor from "jodit-react";
import HTMLReactParser from "html-react-parser";
import { useState, useRef, useMemo } from "react";

const Notes = () => {
  const editor = useRef(null);

  const [content, setContent] = useState("");

  const config = useMemo(() => {
    return {
      readonly: false,
      height: 400,
      uploader: {
        url: "http://localhost:3000/upload",
        format: "json",
        method: "POST",
        isSuccess: (resp) => resp.success === true,
        getMessage: (resp) => resp.message || "Upload failed",
        process: (resp) => {
          return {
            files: [resp.fileUrl],
          };
        },
      },
    };
  }, []);

  return (
    <>
      <div className="px-20 py-10">
        <form action="">
          <div className="flex flex-col mb-6">
            <label className="text-[18px] font-[500]" for="title">
              Title
            </label>
            <input type="text" name="title" />
          </div>

          <div className="description">
            <label className="text-[18px] font-[500]" htmlFor="description">
              Description
            </label>
            <JoditEditor
              name="description"
              ref={editor}
              value={content}
              config={config}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>

          <div className="priority-option mt-6">
            <div className="priority-title mb-2 text-[18px] font-[500]">
              <p>Priority</p>
            </div>

            <div>
              <input type="radio" id="high" name="priority" value="high" />
              <label htmlFor="high" className="priority-high">
                High
              </label>

              <input type="radio" id="medium" name="priority" value="medium" />
              <label htmlFor="medium" className="priority-medium">
                Medium
              </label>

              <input type="radio" id="low" name="priority" value="low" />
              <label htmlFor="low" className="priority-low">
                Low
              </label>
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              type="submit"
              className="btn border-2 px-6 py-2 rounded-xl bg-[#7883FF] text-white text-md "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Notes;
