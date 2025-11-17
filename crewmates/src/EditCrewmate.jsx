// src/EditCrewmate.jsx
import { useState, useEffect } from "react";
import { supabase } from "./client";

function EditCrewmate({ id, onDone }) {
  const [crewmate, setCrewmate] = useState({
    name: "",
    speed: "",
    color: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  // 载入原始资料
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
      if (!data || data.length === 0) {
        setError("Crewmate not found");
      } else {
        setCrewmate(data[0]);  // 只拿第一笔
      }
    }

      setLoading(false);
    };

    if (id) {
      fetchCrewmate();
    }
  }, [id]);

  const handleChange = (field) => (e) => {
    setCrewmate({
      ...crewmate,
      [field]: e.target.value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from("crewmates")
      .update({
        name: crewmate.name,
        speed: crewmate.speed,
        color: crewmate.color,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      setError(error.message);
    } else {
      // 更新成功之后要做什么：回到列表 / 详情，交给 onDone
      if (onDone) onDone();
    }
  };

  const handleDelete = async () => {
    const ok = window.confirm("Are you sure you want to delete this crewmate?");
    if (!ok) return;

    setDeleting(true);
    setError(null);

    const { error } = await supabase
      .from("crewmates")
      .delete()
      .eq("id", id);

    setDeleting(false);

    if (error) {
      setError(error.message);
    } else {
      if (onDone) onDone();
    }
  };

  if (!id) {
    return <p>No crewmate id provided.</p>;
  }

  if (loading) {
    return <p>Loading crewmate for editing...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h1>Edit Crewmate</h1>

      <form onSubmit={handleUpdate}>
        <div>
          Name:
          <input
            type="text"
            value={crewmate.name}
            onChange={handleChange("name")}
          />
        </div>

        <div>
          Speed:
          <input
            type="number"
            value={crewmate.speed}
            onChange={handleChange("speed")}
          />
        </div>

        <div>
          Color:
          <input
            type="text"
            value={crewmate.color}
            onChange={handleChange("color")}
          />
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update"}
        </button>
      </form>

      <hr />

      <button
        type="button"
        onClick={handleDelete}
        disabled={deleting}
        style={{ color: "red" }}
      >
        {deleting ? "Deleting..." : "Delete this crewmate"}
      </button>
    </div>
  );
}

export default EditCrewmate;
