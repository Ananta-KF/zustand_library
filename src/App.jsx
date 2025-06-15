import BookForm from './components/BookForm';
import BookList from './components/BookList';
import './App.css';

export default function App() {
  return (
    <div className="App">
      <h1>Library System with Zustand</h1>
      <BookForm />
      <BookList />
    </div>
  );
}
