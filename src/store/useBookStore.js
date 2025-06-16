import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const useBookStore = create(
  persist(
    (set, get) => ({
      books:     [],
      available: 0,
      issued:    0,

      addBook: (book) =>
        set((s) => ({
          books: [...s.books, { ...book, status: 'available' }],
          available: s.available + 1,
        })),

      issueBook: (id) => {
        const updated = get().books.map((b) =>
          b.id === id ? { ...b, status: 'issued' } : b
        );
        set((s) => ({
          books: updated,
          available: s.available - 1,
          issued: s.issued + 1,
        }));
      },

      returnBook: (id) => {
        const updated = get().books.map((b) =>
          b.id === id ? { ...b, status: 'available' } : b
        );
        set((s) => ({
          books: updated,
          available: s.available + 1,
          issued: s.issued - 1,
        }));
      },

      removeBook: (id) =>
        set((s) => {
          const target = s.books.find((b) => b.id === id);
          if (!target) return s;        
          return {
            books: s.books.filter((b) => b.id !== id),
            available:
              target.status === 'available' ? s.available - 1 : s.available,
            issued: target.status === 'issued' ? s.issued - 1 : s.issued,
          };
        }),

      reset: () => set({ books: [], available: 0, issued: 0 }),
    }),
    {
      name: 'library-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBookStore;
