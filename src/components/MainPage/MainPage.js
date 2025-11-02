import React, { useEffect, useState } from "react";
import axios from "axios";

import { Login } from "../Login/Login";
export function MainPage() {
    const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/users")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <ul>
        {users.map(u => (
          <li key={u.customer_id}>{u.first_name} ({u.last_name})</li>
        ))}
      </ul>
      <Login/>
    </div>
  );
}