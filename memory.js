





//******************************************************************
// Game Logic
//******************************************************************
var MemoryGame = function() {
  this.Cards = [
  		{ name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
  		{ name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
      { name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
      { name: "aquaman",         img: "aquaman.jpg" },
  		{ name: "batman",          img: "batman.jpg" },
  		{ name: "captain america", img: "captain-america.jpg" },
      { name: "fantastic four",  img: "fantastic-four.jpg" },
  		{ name: "flash",           img: "flash.jpg" },
  		{ name: "green arrow",     img: "green-arrow.jpg" },
  		{ name: "green lantern",   img: "green-lantern.jpg" },
  		{ name: "ironman",         img: "ironman.jpg" },
  		{ name: "spiderman",       img: "spiderman.jpg" },
  		{ name: "superman",        img: "superman.jpg" },
  		{ name: "the avengers",    img: "the-avengers.jpg" },
  		{ name: "thor",            img: "thor.jpg" },
  	];
  this.picked_cards  = [];
  this.pairs_clicked = 0;
  this.pairs_guessed = 0;
  this._shuffleCard();
};

MemoryGame.prototype._shuffleCard = function() {
  var counter = this.Cards.length;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);
    counter--;
    temp = this.Cards[counter];
    this.Cards[counter] = this.Cards[index];
    this.Cards[index] = temp;
  }
  return;
};

MemoryGame.prototype.selectCard = function(card) {

  if (this.picked_cards.length === 0) {
    this.picked_cards.push(card);
  }
  else if (this.picked_cards.length == 1) {
    $('.front,.back').addClass('blocked');
    this.pairs_clicked++;
    this.picked_cards.push(card);

    if (this.picked_cards[0].id == this.picked_cards[1].id) {
      this.picked_cards = [];
      this.pairs_guessed++;
      $('.front,.back').removeClass('blocked');
    } else {
      this.pairsClicked++;
      var self = this;
      setTimeout(function () {
        self.picked_cards[0].style.background = '#456783';
        self.picked_cards[1].style.background = '#456783';
        self.picked_cards = [];
        $('.front,.back').removeClass('blocked');
      }, 1000);
    }
  }

};

MemoryGame.prototype.finished = function() {
  return (this.pairs_guessed == '12');
};

//******************************************************************
// HTML/CSS Interactions
//******************************************************************

var memoryGame;
$(document).ready(function(){
  memoryGame = new MemoryGame();
    var html = '';

    memoryGame.Cards.forEach(function(pic, index) {
      html += '<div class= "card" id="card_' + pic.name + '">';
      html += '<div class="back"';
      html += '    name="img/' + pic.name + '"';
      html += '    id="'       + pic.img +  '">';
      html += '</div>';
      html += '<div class="front" ';
      html += 'style="background: url(img/' + pic.img + '") no-repeat"';
      html += '    id="'       + pic.img +  '">';
      html += '</div>';
      html += '</div>';
    });

    // Add all the div's to the HTML
    document.getElementById('memory_board').innerHTML = html;
    // Bind the click event of each element to a function

    $('.back').on('click', function(){
      memoryGame.selectCard(this);
      this.style.background = 'url(img/' + this.id + ') no-repeat';
      document.getElementById('pairs_clicked').innerHTML = memoryGame.pairs_clicked;
      document.getElementById('pairs_guessed').innerHTML = memoryGame.pairs_guessed;
      if (memoryGame.finished()) {alert("You wooon!!!");}
    });
});
