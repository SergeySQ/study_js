'use strict';

let adv = document.querySelector('.adv'),
    books = document.querySelector('.books'),
    book = document.querySelectorAll('.book'),
    book1 = book[0],
    book2 = book[1],
    book3 = book[2],
    book4 = book[3],
    book5 = book[4],
    book6 = book[5],
    li8 = document.createElement('li'),
    imageBody = document.querySelector('body');

imageBody.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

adv.setAttribute('style', 'display: none');
books.insertBefore(book2, book1);
books.insertBefore(book5, book3);
books.insertBefore(book4, book3);
books.insertBefore(book6, book3);

book5.querySelector('a').innerHTML = 'Книга 3. this и Прототипы Объектов';

book1.querySelector('ul').insertBefore(book1.querySelectorAll('li')[8], book1.querySelectorAll('li')[4]);
book1.querySelector('ul').insertBefore(book1.querySelectorAll('li')[7], book1.querySelectorAll('li')[4]);
book1.querySelector('ul').insertBefore(book1.querySelectorAll('li')[2], book1.querySelectorAll('li')[10]);

book6.querySelector('ul').insertBefore(book6.querySelectorAll('li')[9], book6.querySelectorAll('li')[2]);
book6.querySelector('ul').insertBefore(book6.querySelectorAll('li')[4], book6.querySelectorAll('li')[3]);
book6.querySelector('ul').insertBefore(book6.querySelectorAll('li')[5], book6.querySelectorAll('li')[4]);
book6.querySelector('ul').insertBefore(book6.querySelectorAll('li')[6], book6.querySelectorAll('li')[9]);

li8.innerHTML = 'Глава 8: За пределами ES6';
book3.querySelector('ul').insertBefore(li8, book3.querySelectorAll('li')[9]);