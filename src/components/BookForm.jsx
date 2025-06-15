import { useState } from 'react';
import useBookStore from '../store/useBookStore';

export default function BookForm() {
  const addBook = useBookStore((s) => s.addBook);
  const [form, setForm] = useState({ id: '', name: '', author: '' });

  const handleChange = ({ target: { name, value } }) =>
    setForm((f) => ({ ...f, [name]: value }));

  const handleAdd = () => {
    if (!form.id || !form.name || !form.author) {
      alert('Please fill out all fields');
      return;
    }
    addBook(form);
    setForm({ id: '', name: '', author: '' });
  };

  return (
    <div className="form">
      <input
        placeholder="ID"
        name="id"
        value={form.id}
        onChange={handleChange}
      />
      <input
        placeholder="Book title"
        name="name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        placeholder="Author"
        name="author"
        value={form.author}
        onChange={handleChange}
      />
      <button onClick={handleAdd}>Add</button>
    </div>
  );
}
