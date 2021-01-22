window.onload = () => {

    phase.setup();

}

window.query = {
  shuffle: {
    obj: (numbers) => {
      
      numbers = query.shuffle.arr(Object.values(numbers));
      console.log(numbers);

    },
    arr: (a) => {
      for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }
  }
}

window.deck = {

    create: (pack) => {
        return new Promise((resolve,reject) => {

            ajax('cdn/json/deck.'+pack+'.json').then((j,json=JSON.parse(j)) => { console.log('deck',{json});

                window.pack = json;
                var deck = Object.keys(json);
                var cards = [];

                var d1 = 0; do {
                    var name = deck[d1], card = json[name], color = card.color, power = card.power;
                    var html1 = `<card data-color="`+color+`" data-name="`+name+`" data-power="`+power+`">`;
                        html1 += `<section class="faces face-down">`;
                            html1 += `<div class="face front">`;
                                //html1 += `<div class="name">`+name+`</div>`;
                                html1 += `<div class="power">`+power+`</div>`;
                            html1 += `</div>`;
                            html1 += `<div class="face back">`+`</div>`;
                        html1 += `</section>`;
                    html1 += `</card>`;
                    cards[d1] = html1;
                d1++; } while(d1 < deck.length);

                //console.log(cards);
                resolve(cards);

            });

        });
    },

    shuffle: (cards) => {
        
        var json = window.pack;
        var shuffle = query.shuffle.arr(cards);        
        const deck = Math.ceil(shuffle.length / 2);    
        const deck1 = shuffle.splice(0, deck);
        const deck2 = shuffle.splice(-deck);
        console.log({deck1,deck2});

        var d1 = 0, html1 = ``; do { html1 += deck1[d1]; d1++; } while(d1 < deck1.length);
        byId('deck-one').innerHTML = html1;

        var d2 = 0, html2 = ``; do { html2 += deck2[d2]; d2++; } while(d2 < deck2.length);
        byId('deck-two').innerHTML = html2;

    },

    deal: () => {
        
    },

    draw: () => {

    },

    reset: () => {

    }

}

window.phase = {

    setup: async() => {

        var cards = await deck.create('starter');

        deck.shuffle(cards);
        deck.deal();

    }

}