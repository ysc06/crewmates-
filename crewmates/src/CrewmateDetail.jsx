// src/CrewmateDetail.jsx
import { useState, useEffect } from "react";
import { supabase } from "./client";

function CrewmateDetail({ id, onEdit }) {
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCrewmate = async () => {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase
        .from("crewmates")
        .select()
        .eq("id", id);
        

      if (error) {
        setError(error.message);
      } else {
        setCrewmate(data);
      }

      setLoading(false);
    };

    if (id) {
      fetchCrewmate();
    }
  }, [id]);

  if (!id) {
    return <p>No crewmate id provided.</p>;
  }

  if (loading) {
    return <p>Loading crewmate...</p>;
  }

  if (error) {
    return <p>Error loading crewmate: {error}</p>;
  }

  if (!crewmate) {
    return <p>Crewmate not found.</p>;
  }

  return (
    <div>
      <h1>Crewmate Detail</h1>
      <h2>{crewmate.name}</h2>
      <p>Speed: {crewmate.speed}</p>
      <p>Color: {crewmate.color}</p>

      {/* 以后你可以用 onEdit 去切换到 Edit 页 */}
      {onEdit && (
        <button onClick={() => onEdit(crewmate.id)}>
          Edit this crewmate
        </button>
      )}
    </div>
  );
}

export default CrewmateDetail;
