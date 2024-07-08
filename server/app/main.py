"""main.py
FastAPI application configuration.

Functions:
    pong: Returns a pong message.
    get_books: Retrieves all books.
    get_book_by_id: Retrieves a book by ID.
    create_book: Creates a new book.
    update_book: Updates a book.
    delete_book: Deletes a book.
"""

from fastapi import FastAPI, Depends, HTTPException

from sqlalchemy.orm import Session

from .Managers import BooksManager

from . import models, schemas
from .DBConfig.database import SessionLocal, engine

# Create the database tables if they do not exist.
models.Base.metadata.create_all(bind=engine)

# FastAPI application instance.
app = FastAPI()


# Dependency
def get_db():
    """Get a database session.

    Yields:
        Session: Database session.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Routes
@app.get("/ping")
async def pong():
    """Returns a pong message.

    Returns:
        String: Pong message.
    """
    return "pong"


@app.get("/books")
async def get_books(db: Session = Depends(get_db)):
    """Retrieves all books.

    Args:
        db (Session): Database session.

    Returns:
        List[models.Books]: List of books.
    """
    return BooksManager.get_books(db)


@app.get("/books/{book_id}", response_model=schemas.Book)
def get_book_by_id(book_id: int, db: Session = Depends(get_db)):
    """Retrieves a book by ID.

    Args:
        book_id (int): ID of the book to retrieve.
        db (Session): Database session.

    Returns:
        models.Books: Book matching the ID.
    """
    return BooksManager.get_book_by_id(db, book_id)


@app.post("/books", response_model=schemas.CreateBook)
def create_book(book: schemas.BookBase, db: Session = Depends(get_db)):
    """Creates a new book.

    Args:
        book (schemas.BookBase): Book data.
        db (Session): Database session.

    Returns:
        models.Books: Newly created book.
    """
    return {"id": BooksManager.create_book(db, book.title, book.author, book.year)}


@app.put("/books/{book_id}")
def update_book(book_id: int, book: schemas.BookBase, db: Session = Depends(get_db)):
    """Updates a book.

    Args:
        book_id (int): ID of the book to update.
        book (schemas.BookBase): Book data.
        db (Session): Database session.

    Returns:
        models.Books: Updated book.
    """

    if (
        BooksManager.update_book(db, book_id, book.title, book.author, book.year)
        is None
    ):
        raise HTTPException(status_code=404, detail="Book not found")


@app.delete("/books/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db)):
    """Deletes a book.

    Args:
        book_id (int): ID of the book to delete.
        db (Session): Database session.

    Returns:
        Dict: Empty dictionary.
    """
    BooksManager.delete_book(db, book_id)
