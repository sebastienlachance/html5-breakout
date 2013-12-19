var Paddle = Entity.extend({
	x: 135,
	y: 450,
	width: 55,
	height: 10,
	game: null,

	init: function(name, game) {
		this.name = name;
		this.game = game;
	},

	render: function(ctx) {
		ctx.fillStyle = "red";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	},

	getBodyDefinition: function() {
		var bodyDef = new b2BodyDef();
		bodyDef.type = b2Body.b2_dynamicBody;
		bodyDef.position.x = this.x / this.game.scale;
		bodyDef.position.y = this.y / this.game.scale;
		bodyDef.userData = {
			id: this.name,
			ent: this
		}
	}
});

var Breakout = Game.extend({

	prepare: function() {
		this.paddle = new Paddle();
		this.paddle.x = (this.width / 2) - (this.paddle.width / 2)
		this.addEntity(this.paddle);

		this.showDebugInfo();
	},

	update: function() {
	},

	render: function(ctx) {
		ctx.fillStyle = "black";
		ctx.fillRect(0, 0, this.width, this.height);
	}	
	
});

new Breakout(document.getElementById("game")).start();