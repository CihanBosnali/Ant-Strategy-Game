import { Game } from "./classes/game.js";

// get the settings from the current url
const query = new URLSearchParams(window.location.href);

// get the buttons on the page
const buttons = {};
buttons.restart = document.getElementById("btn_restart");
buttons.finish = document.getElementById("btn_end");

// make the restart button have the same query as the current URI
buttons.restart.attributes.href += `?${query}`;


const game = new Game(query.get("size") || 20*60, query.get("tileW") || 60);
game.initGame("game");
game.addPlayer(query.get("p1c"));
game.addPlayer(query.get("p2c"));
game.players[0].start = query.get("p1pos") ? JSON.parse(query.get("p1pos")) : {x: 2, y: 2};
game.players[1].start = query.get("p2pos") ? JSON.parse(query.get("p2pos")) : {x: game.tileShape.w-3, y: 2};

game.p1panel = document.getElementById("p1panel");
game.p2panel = document.getElementById("p2panel");

game.initTiles().then(game => {
	game.render();
	console.log(game);
	game.playTurn();
});

