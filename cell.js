function Cell( radius, x, y, red, green, blue ){
    this.pos = createVector( x, y );
    this.radius = radius;
    this.vel = createVector(0,0);
    red     = red   === undefined ? random(50, 255) : red;
    green   = green === undefined ? random(50, 255) : green;
    blue    = blue  === undefined ? random(50, 255) : blue;
    this.color = color( red, green, blue );
    var yOff = 0;

    this.show = function(){
        //ellipse( this.pos.x, this.pos.y, this.radius*2, this.radius*2 )
        push();
        fill( this.color );
        var borderColor = this.color + 50;
        stroke( red-10, green-10, blue-10 );
        strokeWeight(8);
        translate( this.pos.x, this.pos.y );
        beginShape();
        var xOff = 0;
        for( var i = 0; i < TWO_PI; i += .1 )
        {
            var offset = map( noise(xOff + yOff), 0, 1, -this.radius/10, this.radius/10 )
            var r = this.radius + offset;
            var x = r * cos(i);
            var y = r * sin(i);
            vertex( x, y )
            xOff += 0.05;
        }
        endShape(CLOSE);
        smooth();
        pop();
        var fps = frameRate();
        fill(255);
        stroke(0);
        text("FPS: " + fps.toFixed(2), 0, 0);
        yOff += 0.01;
    }

    this.update = function(){
        var newVel = createVector( mouseX-width/2, mouseY-height/2 );
        newVel.setMag(newVel.mag())
        if( newVel.mag() > 1000 / this.radius ) newVel.setMag( 1000 / this.radius );
        if( newVel.mag() < 1 ) newVel.setMag( 1 );
        this.vel.lerp( newVel, 0.2 );
        this.pos.add( this.vel );
    }

    this.absorbs = function( otherCell ){
        var d = p5.Vector.dist(this.pos, otherCell.pos);
        if( d < this.radius - otherCell.radius )
        {
            var newCellMass = PI * this.radius * this.radius + (PI * otherCell.radius * otherCell.radius)*.5;
            this.radius = sqrt( newCellMass / PI );
            return true;
        }
        return false;
    }

    this.setPosition = function( x, y )
    {
        this.pos.x = x;
        this.pos.y = y;
    }
}