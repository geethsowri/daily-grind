import ModalLayout from "../ModalLayout";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useAddEntryMutation } from "../../redux/api/entriesApiSlice";
import toast from "react-hot-toast";

const AddEntry = () => {
  const [open, setOpen] = useState(false);
  const [addEntry, { isLoading }] = useAddEntryMutation();

  const [formData, setFormData] = useState({
    title: "",
    mood: "🙂",
    content: "",
    date: new Date().toISOString().slice(0, 10),
  });

  useEffect(() => {
    if (open) {
      setFormData({
        title: "",
        mood: "🙂",
        content: "",
        date: new Date().toISOString().slice(0, 10),
      });
    }
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addEntry(formData).unwrap();
      toast.success(res.message || "Entry saved.");
      setOpen(false);
    } catch (err) {
      toast.error(err?.data?.message || "Couldn’t save your entry.");
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-14 h-14 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xl flex justify-center items-center transition shadow-lg"
      >
        <FaPlus />
      </button>

      <ModalLayout isOpen={open} close={() => setOpen(false)}>
        <div className="bg-[#1a1a1a] text-gray-200 p-6 rounded-2xl shadow-xl max-w-lg mx-auto space-y-5">
          <h2 className="text-center text-xl font-semibold">Add New Entry</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm" htmlFor="title">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="Your journal title..."
                className="w-full mt-1 px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg outline-none"
              />
            </div>

            <div className="flex gap-4">
              <div className="flex-1">
                <label className="text-sm" htmlFor="date">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  id="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg"
                />
              </div>

              <div className="flex-1">
                <label className="text-sm" htmlFor="mood">
                  Mood <span className="text-red-500">*</span>
                </label>
                <select
                  name="mood"
                  id="mood"
                  value={formData.mood}
                  onChange={handleChange}
                  className="w-full mt-1 px-3 py-2 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg"
                >
                  <option value="🙂">🙂 Happy</option>
                  <option value="😔">😔 Sad</option>
                  <option value="😡">😡 Angry</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm" htmlFor="content">
                What’s on your mind? <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                id="content"
                value={formData.content}
                onChange={handleChange}
                required
                placeholder="Write your thoughts, memories, or feelings..."
                className="w-full mt-1 px-3 py-2 h-40 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg resize-none outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition disabled:opacity-50"
            >
              {isLoading ? "Saving..." : "Save Entry"}
            </button>
          </form>
        </div>
      </ModalLayout>
    </>
  );
};

export default AddEntry;
