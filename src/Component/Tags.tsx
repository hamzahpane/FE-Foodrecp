import { useEffect, useState } from "react";
import { fetchTags } from "./Redux/Store/features/prodcutSilce";
import {
  useAppSelector,
  useAppDispatch,
} from "./Redux/Store/Hooks/productHook";

// Definisikan tipe untuk props
interface TagsProps {
  onTagClick: (tag: string | null) => void; // Memperbarui tipe untuk onTagClick
}

const Tags: React.FC<TagsProps> = ({ onTagClick }) => {
  const dispatch = useAppDispatch();
  const tags = useAppSelector((state) => state.ricepes.tags);
  const status = useAppSelector((state) => state.ricepes.status);
  const [activeTag, setActiveTag] = useState<string | null>(null); // State untuk tag yang aktif

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTags());
    }
  }, [dispatch, status]);

  if (status === "loading") {
    return <div>Loading tags...</div>;
  }
  if (status === "failed") {
    return <div>Error loading...</div>;
  }

  const handleTagClick = (tag: string) => {
    if (activeTag === tag) {
      // Jika tag yang diklik sama dengan tag aktif, reset ke null
      setActiveTag(null);
      onTagClick(null); // Memanggil onTagClick dengan null
    } else {
      setActiveTag(tag); // Set tag yang aktif
      onTagClick(tag); // Panggil fungsi onTagClick dari props
    }
  };

  return (
    <div className="p-2  mb-5 flex justify-center flex-wrap">
      {tags.map((tag, index) => (
        <button
          key={index}
          className={`m-1 p-2 rounded-md border transition font-bebas ${
            activeTag === tag ? "bg-black  text-white" : "bg-white text-black"
          }`} // Tambahkan kelas sesuai dengan status aktif
          onClick={() => handleTagClick(tag)} // Menangani klik pada tag
        >
          {tag}
        </button>
      ))}
    </div>
  );
};

export default Tags;
