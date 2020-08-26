'use strict';

function DomElement(selector, options) {
    this.selector = selector;
    options = options || {};
    this.height = options.height;
    this.width = options.width;
    this.bg = options.bg;
    this.fontSize = options.fontSize;
}
DomElement.prototype.render = function () {
    if (this.selector[0] === '.') {
        let div = document.createElement('div');
        div.className = this.selector.slice(1);

        div.style.cssText = `height:${this.height};
        width:${this.width};background-color : ${this.bg};fontSize${this.fontSize};
        `;

        div.innerHTML = 'Введенная строка начинается с "точки"';
        document.body.append(div);
    } else if (this.selector[0] === '#') {
        let p = document.createElement('p');
        p.innerHTML = 'pola"id"';
        p.id = this.selector.slice(1);
        p.style.cssText = `height:${this.height};
        width:${this.width};background-color : ${this.bg};fontSize${this.fontSize};
        `;
        p.innerHTML = 'Введенная строка начинается с "решетки"';
        document.body.append(p);
    }
}
let element1 = new DomElement('.test-class', {
    height: '17px',
    width: '100%',
    bg: '#b3ffda',
    fontSize: '14px'
});
element1.render();
let element2 = new DomElement('#test', {
    height: '17px',
    width: '100%',
    bg: '#b3ffaa',
    fontSize: '14px'
});
element2.render();
console.log('.test-class', document.querySelector('.test-class'));
console.log('#test', document.querySelector('#test'));