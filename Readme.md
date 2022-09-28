# Black jack

## How to play
[video](https://www.youtube.com/watch?v=eyoh-Ku9TCI&ab_channel=wikiHow)

# TO DO
- [ ] in the GUI: Remove dealer's chips and in that place position the score
- [ ] characters as POO? 
- [ ] Me be one more object something like "contender"
- [ ] Special values of A's in black Jack
- [ ] What is the utility of "store" object in reducer patter? when to use that pattern?

# API
[Deck of cards](https://www.deckofcardsapi.com/)


## Gameplay:

1. cada jugador apuesta
2. Mostrar un nuevo deck, dealer con carta descubierta
3. repartir a cada jugador dos cartas descubiertas

Objective:

El jugador no se puede pasar del score = 21, el objetivo es llegar a 21 o superar el score del dealer


## rules:

1. bust => score > 21
2. J,Q,K => 10
3. A => 0 | 11

## scenarios

1. player.score === 21: wines one and half times the players bet
2. player.score < 21: player can decide hit(request a card, as many times he wants) or stay (not ask for card)
   1. after the hit player.score > 21: busted, lose the game

once all loop though all the player the dealer reveal their card

1. dealer bust: every remaining players receives twice their bet
2. dealer not bust: only the player who has more score than the dealer wins twice their bet.
