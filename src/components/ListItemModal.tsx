import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-hot-toast";
import { Product } from "../data";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

type ListItemModalProps = {
  onClose: () => void;
  onList: (product: Product) => void;
  categories: string[];
  ownerName: string;
};

export default function ListItemModal({ onClose, onList, categories, ownerName }: ListItemModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(categories[1] || "Electronics");
  const [price, setPrice] = useState("");
  const [yearsOld, setYearsOld] = useState("");
  const [condition, setCondition] = useState<Product["condition"]>("Good");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !price || !imageFile) {
      toast.error("Please fill all fields and upload a photo.");
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading image to cloud...");

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const uploadRes = await fetch(`${API_URL}/api/upload`, {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) throw new Error("Image upload failed");

      const uploadData = await uploadRes.json();
      const finalImageUrl = uploadData.imageUrl;

      const newProduct: Product = {
        id: Math.random().toString(36).substring(7),
        title,
        description,
        category,
        price,
        yearsOld,
        condition,
        image: finalImageUrl,
        owner: ownerName,
        lookingFor: "Open to offers",
      };

      toast.success("Ready to post!", { id: toastId });
      onList(newProduct);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to upload to Cloudinary", { id: toastId });
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative my-8">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-black transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">List an Item 📦</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Photo Upload */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              onChange={handleImageUpload}
            />
            {imagePreview && (
              <div className="mt-3">
                <img src={imagePreview} alt="Preview" className="h-32 rounded-lg object-cover border" />
              </div>
            )}
          </div>

          {/* Title */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Item Name</label>
            <input type="text" placeholder="What are you trading?" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={title} onChange={e => setTitle(e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Estimated Value ($)</label>
              <input type="number" placeholder="50" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={price} onChange={e => setPrice(e.target.value)} />
            </div>

            {/* Years Old */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Years Old</label>
              <input type="number" placeholder="e.g. 2" className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" value={yearsOld} onChange={e => setYearsOld(e.target.value)} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Category</label>
              <select className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={category} onChange={e => setCategory(e.target.value)}>
                {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Condition */}
            <div>
              <label className="block mb-1 text-sm font-semibold">Condition</label>
              <select className="w-full px-4 py-3 border rounded-xl bg-white focus:ring-2 focus:ring-indigo-500 outline-none" value={condition} onChange={e => setCondition(e.target.value as Product["condition"])}>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block mb-1 text-sm font-semibold">Description</label>
            <textarea placeholder="Tell us more about it..." rows={3} className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none" value={description} onChange={e => setDescription(e.target.value)}></textarea>
          </div>

          <button type="submit" disabled={isUploading} className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white py-3.5 rounded-xl font-bold hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-75 disabled:hover:translate-y-0 transition-all mt-4 text-lg">
            {isUploading ? "Processing..." : "Post Listing 🚀"}
          </button>
        </form>
      </div>
    </div>
  );
}
