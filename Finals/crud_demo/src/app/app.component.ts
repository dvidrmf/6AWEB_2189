import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Book {
  id: number;
  bookId: string;
  title: string;
  author: string;
  genre: string;
  desc: string;
  price: number;
  series?: string;
}

export interface FormErrors {
  bookId?: string;
  title?: string;
  author?: string;
  genre?: string;
  desc?: string;
  price?: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'booksapp';
  readonly APIUrl = 'http://localhost:5038/api/books/';

  books: Book[] = [];
  toastMessage = '';
  toastType: 'success' | 'error' | 'warning' = 'success';
  showToast = false;

  genres = [
    'Fantasy', 'Mystery', 'Horror', 'Romance', 'Science Fiction',
    'Historical Fiction', 'Adventure', 'Thriller', 'Non-Fiction', 'Biography'
  ];

  // ── Add Form ──
  newBook = { bookId: '', title: '', author: '', genre: '', desc: '', price: '', series: '' };
  formErrors: FormErrors = {};
  touched: Record<string, boolean> = {};

  // ── Search & Filter ──
  searchQuery = '';
  filterGenre = '';
  filterPriceMin = '';
  filterPriceMax = '';
  sortBy: 'title' | 'author' | 'price' | 'genre' | '' = '';
  sortDir: 'asc' | 'desc' = 'asc';
  showFilters = false;

  // ── Detail Panel ──
  detailBook: Book | null = null;

  // ── Duplicate Dialog ──
  dupDialog = {
    visible: false,
    duplicateBook: null as Book | null,
    newBook: {} as Partial<Book>,
    step: 'series-question' as 'series-question' | 'blocked'
  };

  // ── Edit Modal ──
  editModal = { visible: false, book: null as Book | null };
  editForm = { bookId: '', title: '', author: '', genre: '', desc: '', price: '', series: '' };
  editErrors: FormErrors = {};
  editTouched: Record<string, boolean> = {};

  constructor(private http: HttpClient) {}

  ngOnInit() { this.refreshBooks(); }

  refreshBooks() {
    this.http.get<Book[]>(this.APIUrl + 'GetBooks').subscribe({
      next: (data) => {
        this.books = data;
        if (this.detailBook) {
          const updated = data.find(b => b.id === this.detailBook!.id);
          this.detailBook = updated ? { ...updated } : null;
        }
      },
      error: () => {
        if (this.books.length === 0) {
          this.books = [
            { id: 1, bookId: 'BK-001', title: "Harry Potter and the Philosopher's Stone", author: 'J.K. Rowling', genre: 'Fantasy', desc: 'A young boy discovers he is a wizard and begins his education at a school for witches and wizards.', price: 649, series: 'Harry Potter' },
            { id: 2, bookId: 'BK-002', title: "Harry Potter and the Chamber of Secrets", author: 'J.K. Rowling', genre: 'Fantasy', desc: 'In his second year, Harry investigates a series of mysterious attacks at his school.', price: 699, series: 'Harry Potter' },
            { id: 3, bookId: 'BK-003', title: 'The Name of the Wind', author: 'Patrick Rothfuss', genre: 'Fantasy', desc: 'A legendary figure recounts his life story from humble beginnings to fame as a musician and fighter.', price: 799, series: 'Kingkiller Chronicle' },
            { id: 4, bookId: 'BK-004', title: 'A Study in Scarlet', author: 'Arthur Conan Doyle', genre: 'Mystery', desc: 'The debut of Sherlock Holmes, investigating a murder in London with his new companion Dr. Watson.', price: 399 },
            { id: 5, bookId: 'BK-005', title: 'It', author: 'Stephen King', genre: 'Horror', desc: 'A group of childhood friends reunite as adults to confront an ancient evil lurking beneath their town.', price: 850 },
          ];
        }
      }
    });
  }

  // ── Filtered / Sorted List ──
  get filteredBooks(): Book[] {
    let result = [...this.books];
    const q = this.searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.bookId.toLowerCase().includes(q) ||
        (b.series || '').toLowerCase().includes(q) ||
        b.desc.toLowerCase().includes(q)
      );
    }
    if (this.filterGenre) result = result.filter(b => b.genre === this.filterGenre);
    const minP = parseFloat(this.filterPriceMin);
    const maxP = parseFloat(this.filterPriceMax);
    if (!isNaN(minP)) result = result.filter(b => b.price >= minP);
    if (!isNaN(maxP)) result = result.filter(b => b.price <= maxP);
    if (this.sortBy) {
      result.sort((a, b) => {
        let va: any = a[this.sortBy as keyof Book];
        let vb: any = b[this.sortBy as keyof Book];
        if (typeof va === 'string') va = va.toLowerCase();
        if (typeof vb === 'string') vb = vb.toLowerCase();
        if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
        if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return result;
  }

  get activeFilterCount(): number {
    let c = 0;
    if (this.filterGenre) c++;
    if (this.filterPriceMin) c++;
    if (this.filterPriceMax) c++;
    if (this.sortBy) c++;
    return c;
  }

  get uniqueGenresInBooks(): string[] {
    return [...new Set(this.books.map(b => b.genre))].sort();
  }

  setSort(col: 'title' | 'author' | 'price' | 'genre') {
    if (this.sortBy === col) this.sortDir = this.sortDir === 'asc' ? 'desc' : 'asc';
    else { this.sortBy = col; this.sortDir = 'asc'; }
  }

  clearFilters() {
    this.filterGenre = ''; this.filterPriceMin = ''; this.filterPriceMax = '';
    this.sortBy = ''; this.sortDir = 'asc'; this.searchQuery = '';
  }

  // ── Detail Panel ──
  openDetail(book: Book) {
    if (this.detailBook?.id === book.id) { this.detailBook = null; return; }
    this.detailBook = { ...book };
  }
  closeDetail() { this.detailBook = null; }

  // ── Notifications ──
  showNotification(msg: string, type: 'success' | 'error' | 'warning' = 'success') {
    this.toastMessage = msg; this.toastType = type;
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3800);
  }

  // ── Validation ──
  touch(field: string) { this.touched[field] = true; this.validateField(field); }

  validateField(field: string) {
    const v = this.newBook as any;
    const errs: FormErrors = { ...this.formErrors };
    this._validate(field, v, errs);
    this.formErrors = errs;
  }

  validateAll(): boolean {
    ['bookId', 'title', 'author', 'genre', 'desc', 'price'].forEach(f => {
      this.touched[f] = true;
      this.validateField(f);
    });
    return !Object.values(this.formErrors).some(Boolean);
  }

  private _validate(field: string, v: any, errs: FormErrors) {
    switch (field) {
      case 'bookId': errs.bookId = !v.bookId?.trim() ? 'Book ID is required.' : undefined; break;
      case 'title':  errs.title  = !v.title?.trim()  ? 'Title is required.'   : undefined; break;
      case 'author': errs.author = !v.author?.trim() ? 'Author is required.'  : undefined; break;
      case 'genre':  errs.genre  = !v.genre?.trim()  ? 'Genre is required.'   : undefined; break;
      case 'desc':   errs.desc   = !v.desc?.trim()   ? 'Description is required.' : undefined; break;
      case 'price':
        if (!v.price?.toString().trim()) errs.price = 'Price is required.';
        else if (isNaN(parseFloat(v.price)) || parseFloat(v.price) < 0) errs.price = 'Enter a valid amount.';
        else errs.price = undefined;
        break;
    }
  }

  findDuplicateByTitle(title: string, excludeId?: number): Book | undefined {
    return this.books.find(b =>
      b.title.trim().toLowerCase() === title.trim().toLowerCase() && b.id !== excludeId
    );
  }

  // ── Add ──
  addBook() {
    if (!this.validateAll()) {
      this.showNotification('Please complete all required fields.', 'error');
      return;
    }
    const dup = this.findDuplicateByTitle(this.newBook.title);
    if (dup) {
      this.dupDialog = {
        visible: true,
        duplicateBook: dup,
        newBook: {
          bookId: this.newBook.bookId,
          title: this.newBook.title,
          author: this.newBook.author,
          genre: this.newBook.genre,
          desc: this.newBook.desc,
          price: parseFloat(this.newBook.price),
          series: this.newBook.series
        },
        step: 'series-question'
      };
      return;
    }
    this.submitBook();
  }

  submitBook(overrideData?: Partial<Book>) {
    const bd = overrideData || {
      bookId: this.newBook.bookId,
      title: this.newBook.title,
      author: this.newBook.author,
      genre: this.newBook.genre,
      desc: this.newBook.desc,
      price: parseFloat(this.newBook.price),
      series: this.newBook.series
    };

    const payload = {
      bookId: bd.bookId || '',
      title: bd.title || '',
      author: bd.author || '',
      genre: bd.genre || '',
      desc: bd.desc || '',
      price: Number(bd.price || 0),
      series: bd.series || ''
    };

    this.http.post(this.APIUrl + 'AddBook', payload).subscribe({
      next: () => {
        this.showNotification('Book added to your collection!', 'success');
        this.refreshBooks();
        this.resetForm();
      },
      error: () => {
        const newId = this.books.length > 0 ? Math.max(...this.books.map(b => b.id)) + 1 : 1;
        this.books = [...this.books, { id: newId, ...bd } as Book];
        this.showNotification('Book added to your collection!', 'success');
        this.resetForm();
      }
    });
    this.closeDupDialog();
  }

  onDupSeriesYes() { this.submitBook(this.dupDialog.newBook); }

  onDupSeriesNo() {
    const nA = (this.dupDialog.newBook.author || '').trim().toLowerCase();
    const eA = (this.dupDialog.duplicateBook?.author || '').trim().toLowerCase();
    if (nA !== eA) {
      this.showNotification('Different author — adding as a separate book.', 'warning');
      this.submitBook(this.dupDialog.newBook);
    } else {
      this.dupDialog.step = 'blocked';
    }
  }

  onDupCancel() { this.closeDupDialog(); this.showNotification('Action cancelled.', 'warning'); }
  closeDupDialog() { this.dupDialog.visible = false; }

  resetForm() {
    this.newBook = { bookId: '', title: '', author: '', genre: '', desc: '', price: '', series: '' };
    this.formErrors = {};
    this.touched = {};
  }

  // ── Delete ──
  deleteBook(id: number) {
    if (this.detailBook?.id === id) this.detailBook = null;
    this.http.delete(this.APIUrl + 'DeleteBook?id=' + id).subscribe({
      next: () => {
        this.showNotification('Book removed from collection.', 'warning');
        this.refreshBooks();
      },
      error: () => {
        this.books = this.books.filter(b => b.id !== id);
        this.showNotification('Book removed from collection.', 'warning');
      }
    });
  }

  // ── Related Books ──
  getRelatedBooks(book: Book): Book[] {
    return this.books.filter(b =>
      b.id !== book.id && (
        (book.series && b.series && b.series === book.series) ||
        b.author === book.author ||
        b.genre === book.genre
      )
    ).slice(0, 4);
  }

  // ── Edit ──
  openEdit(book: Book, event: MouseEvent) {
    event.stopPropagation();
    this.editModal = { visible: true, book };
    this.editForm = {
      bookId: book.bookId,
      title: book.title,
      author: book.author,
      genre: book.genre,
      desc: book.desc,
      price: book.price.toString(),
      series: book.series || ''
    };
    this.editErrors = {};
    this.editTouched = {};
  }

  closeEdit() { this.editModal.visible = false; }

  touchEdit(field: string) { this.editTouched[field] = true; this.validateEditField(field); }

  validateEditField(field: string) {
    const v = this.editForm as any;
    const errs: FormErrors = { ...this.editErrors };
    this._validate(field, v, errs);
    this.editErrors = errs;
  }

  validateEditAll(): boolean {
    ['bookId', 'title', 'author', 'genre', 'desc', 'price'].forEach(f => {
      this.editTouched[f] = true;
      this.validateEditField(f);
    });
    return !Object.values(this.editErrors).some(Boolean);
  }

  saveEdit() {
    if (!this.validateEditAll()) {
      this.showNotification('Please fix all errors before saving.', 'error');
      return;
    }
    const book = this.editModal.book!;
    const updated: Book = {
      ...book,
      bookId: this.editForm.bookId,
      title: this.editForm.title,
      author: this.editForm.author,
      genre: this.editForm.genre,
      desc: this.editForm.desc,
      price: parseFloat(this.editForm.price),
      series: this.editForm.series
    };

    const payload = {
      id: book.id,
      bookId: this.editForm.bookId,
      title: this.editForm.title,
      author: this.editForm.author,
      genre: this.editForm.genre,
      desc: this.editForm.desc,
      price: parseFloat(this.editForm.price),
      series: this.editForm.series
    };

    this.http.put(this.APIUrl + 'UpdateBook/' + book.id, payload).subscribe({
      next: () => {
        this.showNotification('Book updated successfully!', 'success');
        this.refreshBooks();
        this.closeEdit();
      },
      error: () => {
        this.books = this.books.map(b => b.id === book.id ? updated : b);
        if (this.detailBook?.id === book.id) this.detailBook = updated;
        this.showNotification('Book updated successfully!', 'success');
        this.closeEdit();
      }
    });
  }
}
