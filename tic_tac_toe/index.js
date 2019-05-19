let board = [];
let size = 1024;

let myCanvas = document.getElementById('myCanvas');
let ctx = myCanvas.getContext('2d');
let height = 15;
let player1 = {
    score:0,
    marker:'X'
}

let player2 = {
    score:0,
    marker:'O'
}

let currentPlayer = player1;

let vsPC = true;

let history = [];

function init(){
    board = []
    for(let i=0;i<size;i++){
        board.push([])
        for(let j=0;j<size;j++){
            board[i].push('');
        }
    }
}

function canPlay(coord){
    let {row,col}=coord;
    if(board[row][col]){
        return false;
    }

    for(let i=-1;i<2;i++){
        let ROW = board[row+i];
        if(ROW){
            for(let j=-1;j<2;j++){
                let CELL = ROW[col+j];
                if(CELL){
                    return true;
                }
            } 
        }
    }
    return false;
}

function play(player,coord){
    let {row,col}=coord;
    board[row][col] = player.marker;
    drawPlayerMove(row,col,board[row][col]);
}

function drawPlayerMove(row,col,move){
    ctx.font = (height*0.667)+"px Arial";
    let pos = getPosition(row,col);
    ctx.fillStyle = '#000000'; 
    ctx.fillText(move,pos.left,pos.top);
    history.push({move,left:pos.left,top:pos.top})
}

function undrawPlayerMove(h){
    ctx.font = (height*0.667)+"px Arial";
    ctx.fillStyle = '#ffffff';
    ctx.fillText(h.move,h.left,h.top);
}

function getPosition(row,col){
    return {
        left:col*height+(height/4),
        top:row*height+(height/1.363)
    }
}

function canvasApp () {
    myCanvas.width = size*height;
    myCanvas.height = size*height;
    init();
    drawGrid();
    attachEvents();
    
    let middle = Math.floor(size/2);
    play(currentPlayer,{row:20,col:30})
}

function drawGrid(){
    var x = 0;
    var y = 0;
    var w = height*size;
    var h = height*size;
        
    ctx.lineWidth = 1;
    
    for (let i=0;i<=size;i++) {
        ctx.moveTo(x, y);
        ctx.lineTo(w, y);
        y = y + height;
    }

    y = 0;  
    for (let i=0;i<=size;i++) {
        ctx.moveTo(x, y);  
        ctx.lineTo(x,h);  
        ctx.stroke();
        x = x + height;
    }
}

function attachEvents(){
    myCanvas.addEventListener('click', function(e) { 
        playTurn(coordToCell(e.pageX,e.pageY));
    }, false);
}

function playTurn(coord){
    currentPlayer = currentPlayer==player1?player2:player1;
    if(canPlay(coord)){
        play(currentPlayer,coord);
        if(hasScored(coord)){
            currentPlayer.score += 1;
            history.map(undrawPlayerMove)
            init()
            if(currentPlayer.score==3){
                alert('player '+currentPlayer.marker+' won overall');
            }
            else {
                currentPlayer = player1;
                play(currentPlayer,{row:20,col:20})
            }
        }
        if(vsPC){
           /*for(let i=0;i<board.length;i++){

           }*/
        }
        console.info(currentPlayer)
    }
}

function coordToCell(x,y){
    return {row:Math.floor(y/height),col:Math.floor(x/height)}
}

function hasScored(coord){
    return checkRow(coord) || checkColumn(coord) || checkDiagonal1(coord) || checkDiagonal2(coord);
}

function checkRow(coord){
    let {row,col} = coord;
    let move = board[row][col];
    let lower = col-1;
    let upper = col+1;
    let count = 1;
    while((upper!=false||lower!=false) && count<5){
        if(board[row] && board[row][upper]==move){
            upper++;
            count++;
        }
        else {
            upper = false
        }

        if(board[row] && board[row][lower]==move){
            lower--;
            count++;
        }
        else {
            lower = false
        }
    }
    return count >=5;
}

function checkColumn(coord){
    let {row,col} = coord;
    let move = board[row][col];
    let lower = row-1;
    let upper = row+1;
    let count = 1;
    while((upper!=false||lower!=false) && count<5){
        if(upper!=false && board[upper] && board[upper][col]==move){
            upper++;
            count++;
        }
        else {
            upper = false
        }

        if(lower!=false && board[lower] && board[lower][col]==move){
            lower--;
            count++;
        }
        else {
            lower = false
        }
    }
    return count >=5;
}

function checkDiagonal1(coord){
    let {row,col} = coord;
    let move = board[row][col];
    let r1 = row-1;
    let c1 = col-1;

    let r2 = row+1;
    let c2 = col+1
    let count = 1;
    while((r2!=false||r1!=false) && count<5){
        if(r2!=false && board[r2][c2]==move){
            r2++;
            c2++;
            count++;
        }
        else {
            r2 = false
        }

        if(r1!=false && board[r1][col]==move){
            r1--;
            c1--;
            count++;
        }
        else {
            r1 = false
        }
    }
    return count >=5;
}

function checkDiagonal2(coord){
    let {row,col} = coord;
    let move = board[row][col];
    let r1 = row-1;
    let c1 = col+1;

    let r2 = row+1;
    let c2 = col-1
    let count = 1;
    while((r2!=false||r1!=false) && count<5){
        if(r2!=false && board[r2][c2]==move){
            r2++;
            c2--;
            count++;
        }
        else {
            r2 = false
        }

        if(r1!=false  && board[r1][col]==move){
            r1--;
            c1++;
            count++;
        }
        else {
            r1 = false
        }
    }
    return count >=5;
}
window.addEventListener('load', canvasApp, false);