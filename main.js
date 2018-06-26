const startgame = function startgame() {
	const playernum = parseInt(document.getElementById("player_number").value);
	const players = [];

	if (players.length != playernum) throw new Error("player number doesnt match the entered names");

	const myUrl = new URL("/game.html");
	myUrl.searchParams.append("pn", playernum);
	for (let i = 0; i < players.length; i++) {
		const playername = players[i];
		myUrl.searchParams.append("p"+i, playername);
	}

	window.location.href = myUrl.href;
};

