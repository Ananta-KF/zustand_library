import useBookStore from '../store/useBookStore';

export default function BookList() {
  const books      = useBookStore((s) => s.books);
  const available  = useBookStore((s) => s.available);
  const issued     = useBookStore((s) => s.issued);
  const issueBook  = useBookStore((s) => s.issueBook);
  const returnBook = useBookStore((s) => s.returnBook);
  const removeBook = useBookStore((s) => s.removeBook);  

  return (
    <div className="list">
      {books.length > 0 && (
        <p>
          <strong>Available:</strong> {available} &nbsp;|&nbsp;
          <strong>Issued:</strong> {issued}
        </p>
      )}

      <ul>
        {books.map((b) => (
          <li key={b.id}>
            <span>
              [{b.id}] {b.name} — {b.author}
            </span>

            <button
              onClick={() => issueBook(b.id)}
              disabled={b.status === 'issued'}
            >
              Issue
            </button>

            <button
              onClick={() => returnBook(b.id)}
              disabled={b.status === 'available'}
            >
              Return
            </button>

            <button onClick={() => removeBook(b.id)}>Remove</button>  {}
          </li>
        ))}
      </ul>
    </div>
  );
}
