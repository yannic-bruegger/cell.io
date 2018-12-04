var playerCell;
var cells = [];
var zoom = 1;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    playerCell = new Cell(64, 0, 0);

    for( var i = 0; i < 500; i++ ){
        cells.push( new Cell( 20, random( -width*4, width*4 ), random( -height*4, height*4 ), 215,0,215 ) );
    }

}

function draw() {
    
    background(50);
    
    translate( width/2, height/2 );
    newZoom = 64 / playerCell.radius;
    zoom = lerp(zoom, newZoom, .1);
    scale( zoom );
    translate( -playerCell.pos.x, -playerCell.pos.y );


    
    cells.forEach(function( cell ){
        cell.show();
        if( playerCell.absorbs( cell ) )
        {
            cells.splice( cells.indexOf( cell ), 1 );
            cells.push( new Cell( 20, random( -width*4, width*4 ), random( -height*4, height*4 ), 0,215,215 ) );
            console.log( "Got me" );
        }
    });
    playerCell.show();
    playerCell.update();
    
}