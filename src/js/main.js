(function(window, document) {
    const $on = document.addEventListener.bind(document);
    const $ = document.querySelector.bind(document);
    const $new = document.createElement.bind(document);
    const $newNS = document.createElementNS.bind(document);

    $on('DOMContentLoaded', function() {
        Card.$ = $;
        Card.$new = $new;
        Card.$newNS = $newNS;

        Card.init();

        const cards = [];
        const parent = $('.table');

        let row = 1;

        Object.keys(Card.suits).map(suit => {
            let col = 1;

            Object.keys(Card.ranks).map(rank => {
                const card = new Card({
                    rank,
                    suit,
                    parent,
                    classNames: [
                        'c' + col,
                        'r' + row,
                    ],
                });

                cards.push(card);

                col++;
            });

            row++;
        });
    });
})(window, document);
