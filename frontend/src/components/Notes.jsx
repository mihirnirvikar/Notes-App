import React, { useState, useEffect, useRef, useMemo } from "react";
import { useParams } from "react-router";
import JoditEditor from "jodit-react";

const Notes = () => {
  const { id } = useParams();
  const editor = useRef(null);

  const [data, setData] = useState(null);
  const [editedNote, setEditedNote] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Jodit Editor config
  const config = useMemo(
    () => ({
      readonly: false,
      height: 400,
      toolbarSticky: true,
      spellcheck: true,
      askBeforePasteHTML: true,
      askBeforePasteFromWord: true,
      language: "en",
      toolbarButtonSize: "middle",
      toolbarAdaptive: true,
      toolbarStickyOffset: 50,
      showXPathInStatusbar: true,
      statusbar: true,
      resize: {
        enabled: true,
        direction: "both",
        step: 10,
      },
      enableDragAndDropFileToEditor: true,
      enableDragAndDropImageToEditor: true,
      uploader: {
        insertImageAsBase64URI: false,
        url: "http://localhost:3000/upload",
        format: "json",
        method: "POST",
        filesVariableName: "files[0]", // must be files[0]
        headers: {},
        isSuccess: (resp) => resp.success === true,
        getMessage: (resp) => resp.message || "Upload failed",
        process: (resp) => ({ files: [resp.fileUrl] }),
        errorHandler: (resp) =>
          alert("Upload failed: " + (resp.message || "Unknown error")),
      },
      buttons: [
        "source",
        "undo",
        "redo",
        "|",
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "subscript",
        "superscript",
        "|",
        "eraser",
        "copyformat",
        "|",
        "ul",
        "ol",
        "indent",
        "outdent",
        "|",
        "align",
        "font",
        "fontsize",
        "brush",
        "paragraph",
        "|",
        "image",
        "video",
        "table",
        "link",
        "|",
        "hr",
        "symbol",
        "fullsize",
        "print",
        "about",
      ],
      extraButtons: [],
      shortcut: true,
      placeholder: "Write your notes here...",
    }),
    []
  );

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/notes/${id}`);
        const json = await response.json();
        setData(json);
        setEditedNote({
          title: json.title,
          description: json.description,
          priority: json.priority,
          dueDate: json.dueDate ? json.dueDate.split("T")[0] : "",
        });
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Due date validation: no past dates
    if (name === "dueDate") {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selectedDate = new Date(value);
      if (selectedDate < today) {
        alert("Due date cannot be in the past!");
        return;
      }
    }

    setEditedNote((prev) => ({ ...prev, [name]: value }));
  };

  // ONLY update description onBlur to prevent cursor jumping
  const handleEditorBlur = (newContent) => {
    setEditedNote((prev) => ({ ...prev, description: newContent }));
  };

  const toggleEdit = async () => {
    if (isEditing) {
      try {
        if (!editedNote.title.trim()) {
          alert("Title cannot be empty.");
          return;
        }
        if (editedNote.dueDate) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const selectedDate = new Date(editedNote.dueDate);
          if (selectedDate < today) {
            alert("Due date cannot be in the past!");
            return;
          }
        }

        const response = await fetch(`http://localhost:3000/notes/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(editedNote),
        });
        if (!response.ok) throw new Error("Failed to save");

        const updated = await response.json();
        setData(updated);
        setEditedNote({
          title: updated.title,
          description: updated.description,
          priority: updated.priority,
          dueDate: updated.dueDate ? updated.dueDate.split("T")[0] : "",
        });
        setIsEditing(false);
      } catch (err) {
        alert("Error saving note. Try again.");
        console.error(err);
      }
    } else {
      setIsEditing(true);
    }
  };

  const cancelEdit = () => {
    setEditedNote({
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate ? data.dueDate.split("T")[0] : "",
    });
    setIsEditing(false);
  };

  const resetEdits = () => {
    setEditedNote({
      title: data.title,
      description: data.description,
      priority: data.priority,
      dueDate: data.dueDate ? data.dueDate.split("T")[0] : "",
    });
  };

  if (!data) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="min-h-[calc(100vh-64px)] mt-[124px] px-8 md:px-36 py-8 bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Header with title & buttons */}
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          {isEditing ? (
            <input
              type="text"
              name="title"
              value={editedNote.title}
              onChange={handleChange}
              className="text-4xl font-semibold text-gray-800 border border-gray-300 rounded px-4 py-2 w-full mr-6"
              placeholder="Enter title"
              autoFocus
              required
            />
          ) : (
            <h1 className="text-4xl font-semibold text-gray-800">
              {editedNote.title}
            </h1>
          )}

          <div className="flex space-x-3">
            {isEditing && (
              <>
                <button
                  onClick={resetEdits}
                  className="px-4 py-2 bg-yellow-400 text-gray-800 rounded hover:bg-yellow-500 transition text-sm font-medium shadow"
                  title="Reset Edits"
                >
                  Reset
                </button>
                <button
                  onClick={cancelEdit}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition text-sm font-medium shadow"
                  title="Cancel Editing"
                >
                  Back
                </button>
              </>
            )}

            <button
              onClick={toggleEdit}
              className={`px-4 py-2 rounded text-sm font-medium shadow
                ${
                  isEditing
                    ? "bg-green-600 hover:bg-green-700 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              title={isEditing ? "Save Note" : "Edit Note"}
            >
              {isEditing ? "Save" : "Edit"}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          {isEditing ? (
            <JoditEditor
              ref={editor}
              value={editedNote.description}
              config={config}
              onBlur={handleEditorBlur} // Only onBlur update state
              // Removed onChange to prevent cursor jumping
            />
          ) : (
            <div
              className="whitespace-pre-wrap p-6 bg-gray-100 rounded-lg shadow-sm text-gray-700"
              dangerouslySetInnerHTML={{ __html: editedNote.description }}
            />
          )}
        </div>

        {/* Priority and Due Date */}
        {isEditing && (
          <div className="mb-6 flex flex-wrap justify-between items-center space-x-8">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-4">
                Priority:
              </span>
              <div className="flex space-x-4">
                {["High", "Medium", "Low"].map((level) => {
                  const isChecked = editedNote.priority === level;
                  let bgColor = "bg-gray-100 border-gray-300 text-gray-800";
                  if (isChecked) {
                    if (level === "High")
                      bgColor = "bg-red-500 border-red-600 text-black";
                    else if (level === "Medium")
                      bgColor = "bg-yellow-300 border-yellow-400 text-black";
                    else if (level === "Low")
                      bgColor = "bg-green-400 border-green-500 text-black";
                  }

                  return (
                    <label
                      key={level}
                      className={`cursor-pointer rounded-full border-2 px-4 py-1 select-none transition-colors duration-300 flex items-center justify-center ${bgColor}`}
                    >
                      <input
                        type="radio"
                        name="priority"
                        value={level}
                        checked={isChecked}
                        onChange={handleChange}
                        className="hidden"
                        required
                      />
                      <span className="text-sm font-medium">{level}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center">
              <span className="font-semibold text-gray-700 mr-4">
                Due Date:
              </span>
              <input
                type="date"
                name="dueDate"
                value={editedNote.dueDate}
                onChange={handleChange}
                className="border border-gray-300 rounded px-4 py-1 text-gray-700 cursor-pointer"
                style={{ minWidth: "160px" }}
                min={new Date().toISOString().split("T")[0]} // disable past dates
              />
            </div>
          </div>
        )}

        {/* View mode: Priority, Created At and Due Date */}
        {!isEditing && (
          <div className="flex items-center gap-8 text-sm justify-between text-gray-600 mb-6">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Priority:</span>
              <span>{editedNote.priority}</span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold">Due Date:</span>
              <span>
                {editedNote.dueDate
                  ? new Date(editedNote.dueDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <span className="font-semibold">Created:</span>
              <span>{new Date(data?.createdAt).toLocaleString()}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notes;
