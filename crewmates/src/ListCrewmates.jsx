// src/ListCrewmates.jsx
import { useState, useEffect } from "preact/hooks";
import { supabase } from "./client";

function ListCrewmates({ onEdit }) {
  const [crewmates, setCrewmates] = useState([]);

  useEffect(() => {
    const fetchCrewmates = async () => {
      const { data } = await supabase
        .from("crewmates")
        .select()
        .order("created_at", { ascending: false });

      setCrewmates(data || []);
    };

    fetchCrewmates();
  }, []);

  return (
    <div>
      <h1>Crewmates Gallery</h1>

      {crewmates.length === 0 && <p>No crewmates yet.</p>}

      {crewmates.map((c) => (
        <div
          key={c.id}
          style={{
            border: "1px solid #ccc",
            padding: "8px",
            marginBottom: "8px",
            borderRadius: "4px",
          }}
        >
          <h2>{c.name}</h2>
          <p>Speed: {c.speed}</p>
          <p>Color: {c.color}</p>

          {onEdit && (
            <button onClick={() => onEdit(c.id)}>
              Edit
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default ListCrewmates;
