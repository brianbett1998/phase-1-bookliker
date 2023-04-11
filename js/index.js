document.addEventListener("DOMContentLoaded", function() {
  const bookList = document.getElementById('list');
  const bookDetail = document.getElementById('book-details');
  let currentUser = {"id":1, "username":"pouros"};

  // Load books and add them to the book list
  fetch('http://localhost:3000/books')
  .then(response => response.json())
  .then(books =>{
      books.forEach(book =>{
          const li = document.createElement('li');
          li.textContent = book.title;
          li.addEventListener('click',(list)=>{
              showBookDetails(book);
              list.appendChild(li);
          });
          bookList.appendChild(li);
      });
  });

  // Show book details
  function showBookDetails(book) {
      bookDetail.innerHTML = '';
      const img = document.createElement('img');
      img.src = book.img_url;
      bookDetail.appendChild(img);

      const title = document.createElement('h2');
      title.textContent = book.title;
      bookDetail.appendChild(title);
      const subtitle = document.createElement('h3');
      subtitle.textContent = book.subtitle;
      bookDetail.appendChild(subtitle);

      const author = document.createElement('h4');
      author.textContent = book.author;
      bookDetail.appendChild(author);

      const description = document.createElement('p');
      description.textContent = book.description;
      bookDetail.appendChild(description);
      const likeBtn = document.createElement('button');
      likeBtn.textContent = 'Like';
      likeBtn.addEventListener('click', () => {
        toggleLike(book);
      });
      bookDetail.appendChild(likeBtn);
    
      const likers = document.createElement('ul');
      book.users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.username;
        likers.appendChild(li);
      });
      bookDetail.appendChild(likers);
  }
    
  // Toggle like for a book
  function toggleLike(book) {
      const liked = book.users.find(user => user.id === currentUser.id);
    
      if (liked) {
        book.users = book.users.filter(user => user.id !== currentUser.id);
      } else {
        book.users.push(currentUser);
      }
    
      fetch(`http://localhost:3000/books/${book.id}` ,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ users: book.users })
      })
        .then(response => response.json())
        .then(updatedBook => {
          showBookDetails(updatedBook);
      });
  }
});