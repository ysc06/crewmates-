// src/App.jsx
import { useState } from "preact/hooks";
import "./app.css";

import CreateCrewmate from "./CreateCrewmate";
import ListCrewmates from "./ListCrewmates";
import EditCrewmate from "./EditCrewmate";

function App() {
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);   // 记住要编辑哪一笔
  };

  const handleDone = () => {
    setEditingId(null); // 编辑完回到列表
  };

  return (
    <div>
      <CreateCrewmate />
      <hr />

      {editingId === null ? (
        // 没有正在编辑 → 显示列表
        <ListCrewmates onEdit={handleEdit} />
      ) : (
        // 有 editingId → 显示编辑页
        <EditCrewmate id={editingId} onDone={handleDone} />
      )}
    </div>
  );
}

export default App;
