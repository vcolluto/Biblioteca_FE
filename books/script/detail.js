const URLParams=new URLSearchParams(window.location.search);
const bookId=URLParams.get('id');

axios.get(`http://localhost:8080/books/${bookId}`).then((res) => {
    console.log('richiesta ok', res);
    //res.data è un Book 
    document.querySelector('#title').innerHTML= res.data.title;
    document.querySelector('#author').innerHTML= res.data.author;
    document.querySelector('#isbn').innerHTML= res.data.isbn;
    document.querySelector('#availableCopies').innerHTML= res.data.availableCopies;
    res.data.categories.forEach(category => {
        document.querySelector('#ul_categories').innerHTML+=
        '<li>'+category.name+'</li>';
    });
    
}).catch((res) => {
    console.error('errore nella richiesta', res);
    alert('Errore durante la richiesta!');
});