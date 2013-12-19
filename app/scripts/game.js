/*jslint maxlen: 500 */
'use strict';

var b2Vec2 = Box2D.Common.Math.b2Vec2, b2BodyDef = Box2D.Dynamics.b2BodyDef, b2Body = Box2D.Dynamics.b2Body, b2FixtureDef = Box2D.Dynamics.b2FixtureDef, b2Fixture = Box2D.Dynamics.b2Fixture, b2World = Box2D.Dynamics.b2World, b2MassData = Box2D.Collision.Shapes.b2MassData, b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape, b2CircleShape = Box2D.Collision.Shapes.b2CircleShape, b2DebugDraw = Box2D.Dynamics.b2DebugDraw, b2WorldManifold = Box2D.Collision.b2WorldManifold;

var Game = Class.extend({
    entities: [],
    width: 0,
    height: 0,
    canvas: null,
    context: null,
    scale: 30,

    init: function(canvas, options) {
        this.world = new b2World(new b2Vec2(0, 0), true);

        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.options = options;
        this.prepare();
    },

    start: function() {
        //loop here with rfa
        var game = this;
        (function loop() {
            requestAnimationFrame(loop);

            game._update();

            game._clearCanvas();
            game._render(game.ctx);
        })();
    },

    _clearCanvas: function() {
        this.ctx.save();
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();
    },

    prepare: function() {
    //must be implemented
    },

    _update: function() {
        for (var i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].update();
        }
        this.update();
    },

    update: function() {
        //must be implemented
    },

    _render: function(ctx) {
        this.render(ctx);
        for (var i = this.entities.length - 1; i >= 0; i--) {
            this.entities[i].render(ctx);
        }
    },

    render: function() {
        //must be implemented
    },

    addEntity: function(entity) {
        var bodyDef = entity.getBodyDefinition();
        var fixtureDef = entity.getFixtureDefinition();
        var body = this.world.CreateBody(bodyDef);
        body.CreateFixture(fixtureDef);
        entity.physicBody = body;

        this.entities.push(entity);
    },

    showDebugInfo: function() {
        console.log(
            'Game Dimensions: ' + this.width + ' x ' + this.height +
            ', scale: ' + this.scale);

        for (var i = 0; i < this.entities.length; i++) {
            console.log('Entity "' + this.entities[i].name + '"', this.entities[i]);
        }
    }
});
