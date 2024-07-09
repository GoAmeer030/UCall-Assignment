# UCall-Books

A book management application ( Ucall service assignment )

### Prerequisites

What things you need to install the software and how to install them:

-   Node.js
-   Python (for the server-side)
-   Mysql Database

### Installing

A step by step series of examples that tell you how to get a development environment running.

First, clone the repository:

```bash
git clone https://github.com/GoAmeer030/UCall-Assignment

cd UCall-Assignment
```

After getting into the project directory, to set up the database:

1. Install the MySQL by following this [link](https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/ "MySQL Installation Guide")
2. Create a Database
3. Add the URL to `.env` in `server`

Now, to setup the server (backend):

```bash
cd server
```

Create a virtual environment

```bash
python -m venv venv

# To activate the virtual environment
.\venv\Scripts\activate # for windows system
Source venv/bin/activate # for linux system
```

Install the dependencies

```bash
pip install -r requirements.txt
```

Run the application

```bash
uvicorn app.main:app
```

To setup client (frontend):

1. Rename the `.env.example` to `.env`
2. Add the `server` URL to the `.env` in client
3. Run the following commands

```bash
cd client
npm i
npm run dev
```

### Endpoints

-   `GET` `/books` - list all books
-   `GET` `/books/{id}` - get one book
-   `PUT` `/books/{id}` - update a book
-   `DELETE` `/books/{id}` - delete a book
