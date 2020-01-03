class Card {
    constructor(props) {
        Object.assign(this, props);

        const rank = Card.ranks[this.rank];
        const suit = Card.suits[this.suit];
        const pic = Card.pics[this.rank + '-' + this.suit];

        const classNames = [
            'Card',
            this.suit,
            this.rank,
        ];

        if (pic) {
            classNames.push('pic');
        }

        this.node = Card.$new('div');
        this.node.className = classNames.concat(this.classNames || []).join(' ');

        this.node.appendChild(rank.cloneNode(true));
        this.node.appendChild(suit.cloneNode(true));

        if (pic) {
            this.node.appendChild(pic.cloneNode(true));
        } else {
            this.node.appendChild(suit.cloneNode(true));
        }

        this.parent.appendChild(this.node);
    }
}

Card.svg = function(path) {
    const svg = Card.$newNS('http://www.w3.org/2000/svg', 'svg');
    if (!path) return svg;

    const w = path.getAttribute('w') || 512;
    const h = path.getAttribute('h') || 512;

    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);

    path.removeAttribute('class');
    path.removeAttribute('w');
    path.removeAttribute('h');

    svg.appendChild(path);

    return svg;
};

Card.init = function() {
    const { $, svg } = Card;

    const suits = [
        'clubs', // ♣
        'diamonds', // ♦
        'hearts', // ♥
        'spades', // ♠
    ];

    const ranks = [
        'two',
        'three',
        'four',
        'five',
        'six',
        'seven',
        'eight',
        'nine',
        'ten',
        'jack',
        'queen',
        'king',
        'ace',
    ];

    const pics = [
        'jc', 'qc', 'kc', // ♣
        'jd', 'qd', 'kd', // ♦
        'jh', 'qh', 'kh', // ♥
        'js', 'qs', 'ks', // ♠
    ];

    Card.suits = {};

    suits.map(suit => {
        Card.suits[suit] = svg($('.Card-tpl .' + suit));
    });

    Card.ranks = {};

    ranks.map(rank => {
        Card.ranks[rank] = svg($('.Card-tpl .' + rank));
    });

    Card.pics = {};

    pics.map(pic => {
        Card.pics[pic] = svg($('.Card-tpl .' + pic));
    });
};
