class Card {
    constructor(props) {
        Object.assign(this, props);

        const r = this.rank;
        const s = this.suit;

        const rank = Card.ranks[r];
        const suit = Card.suits[s];

        const isAce = r === 'ace';
        const isPic = r === 'king' || r === 'queen' || r === 'jack';

        const classNames = [
            'Card',
            this.suit,
            this.rank,
            this.faceDown ? 'back' : 'face',
        ];

        this.node = Card.$new('div');
        this.node.className = classNames.concat(this.classNames || []).join(' ');

        if (!this.faceDown) {
            this.node.appendChild(rank.cloneNode(true));
            this.node.appendChild(suit.cloneNode(true));

            if (!isPic && !isAce) {
                this.node.appendChild(suit.cloneNode(true));
            }
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
        'diamonds', // ♦
        'clubs', // ♣
        'hearts', // ♥
        'spades', // ♠
    ];

    const ranks = [
        'ace',
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
    ];

    Card.suits = {};

    suits.map(suit => {
        Card.suits[suit] = svg($('.Card-tpl .' + suit));
    });

    Card.ranks = {};

    ranks.map(rank => {
        Card.ranks[rank] = svg($('.Card-tpl .' + rank));
    });
};
