var canvas = document.querySelector('canvas');

canvas.width = document.getElementById("canvasWidth").clientWidth;
canvas.height = canvas.width;

var c = canvas.getContext('2d');

document.getElementById("neumann").checked = true;

let size = 200;
let nucleons = 10;
let space = undefined;
let drawing = undefined;
let neighbourhood = 'neumann';
let periodic = false;
let play = false;
let teofils = document.querySelectorAll(".teofil");
let array = [];
teofils[1].checked=true;
teofils[3].checked=true;
teofils[4].checked=true;
teofils[6].checked=true;

let rect = canvas.getBoundingClientRect();
let flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

let xx = "white",
    yy = canvas.width/size;

let drawMode = false;

function draw() {
    c.beginPath();
    c.moveTo(prevX, prevY);
    c.lineTo(currX, currY);
    c.strokeStyle = xx;
    c.lineWidth = yy;
    c.stroke();
    c.closePath();
}
function findxy(res, e) {
    this.iks;
    this.igrek;
    this.tempColor;
    if (res == 'down') {

        prevX = currX;
        prevY = currY;
        currX = e.clientX - rect.left;
        currY = e.clientY - rect.top;
        this.iks = Math.floor(currX/canvas.width*size)+1;
        this.igrek = Math.floor(currY/canvas.height*size)+1;
        
        r=Math.floor(Math.random() * 238 + 16);
        g=Math.floor(Math.random() * 238 + 16);
        b=Math.floor(Math.random() * 238 + 16);
        this.tempColor = "#" + r.toString(16).toUpperCase() +
        g.toString(16).toUpperCase()+
        b.toString(16).toUpperCase();

        space.setSeed(this.iks,this.igrek,space.currentId++,this.tempColor);

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            c.beginPath();
            c.fillStyle = space.lattice[this.iks][this.igrek].color;
            c.fillRect((this.iks-1)*yy, (this.igrek-1)*yy, yy, yy);
            c.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - rect.left;
            currY = e.clientY - rect.top;
            //draw();
            this.iks = Math.floor(currX/canvas.width*size)+1;
            this.igrek = Math.floor(currY/canvas.height*size)+1;
            space.setSeed(this.iks,this.igrek,space.currentId,this.tempColor);
            c.beginPath();
            c.fillStyle = space.lattice[this.iks][this.igrek].color;
            c.fillRect((this.iks-1)*yy, (this.igrek-1)*yy, yy, yy);
            c.closePath();
        }
    }
}



let grainCurrentID = document.getElementById("currentId");
let mouse = {
    x: undefined,
    y: undefined
};
init(size);
drawing.drawSeeds();
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.start').addEventListener('click', function() {
        //init(size);
        play = !play;
        animate();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.reset').addEventListener('click', function() {
        play = false;
        drawMode = false;
        array=[];
        c.clearRect(0,0,canvas.width,canvas.height);
        init(size);
        drawing.drawSeeds();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.step').addEventListener('click', function() {
        drawing.drawStep();
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.preset').addEventListener('click', function() {
        space = undefined;
        space = new Space(size);
        space.init();
        space.setEven();
        drawing = new Drawing();
        drawing.init(space);
        drawing.drawSeeds();
        grainCurrentID.innerHTML = space.currentId-1;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.last').addEventListener('click', function() {
        space = undefined;
        space = new Space(size);
        space.init();
        space.setLast();
        drawing = new Drawing();
        drawing.init(space);
        drawing.drawSeeds();
        grainCurrentID.innerHTML = space.currentId-1;
    });
});
document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.drawMode').addEventListener('click', function() {
        play = false;
        drawMode = true;
        c.clearRect(0,0,canvas.width,canvas.height);

        space = undefined;
        space = new Space(size);
        space.init();
        drawing = new Drawing();
        drawing.init(space);
        grainCurrentID.innerHTML = space.currentId-1;
    });
});

document.getElementById('neumann').addEventListener('click',function(){
    neighbourhood = 'neumann';
    teofils[0].checked=false;
    teofils[1].checked=true;
    teofils[2].checked=false;
    teofils[3].checked=true;
    teofils[4].checked=true;
    teofils[5].checked=false;
    teofils[6].checked=true;
    teofils[7].checked=false;
});
document.getElementById('moore').addEventListener('click',function(){
    neighbourhood = 'moore';
    teofils[0].checked=true;
    teofils[1].checked=true;
    teofils[2].checked=true;
    teofils[3].checked=true;
    teofils[4].checked=true;
    teofils[5].checked=true;
    teofils[6].checked=true;
    teofils[7].checked=true;
});
document.getElementById('pent').addEventListener('click',function(){
    neighbourhood = 'pentagonal';
});
document.getElementById('hex').addEventListener('click',function(){
    neighbourhood = 'hexagonal';
});
document.getElementById('user').addEventListener('click',function(){
    neighbourhood = 'user';
});
document.getElementById('periodic').addEventListener('click',function(){
    if(document.getElementById('periodic').checked){
        periodic = true;
    }else{
        periodic = false;
    }   
});


let grainIdValue = document.getElementById("grainId");
let grainColorValue = document.getElementById("grainColor");



canvas.addEventListener('mousemove',
    function(event){
        
        mouse.x = event.clientX - rect.left;
        mouse.y = event.clientY - rect.top;
        
        this.x = Math.floor(mouse.x/canvas.width*size)+1;
        this.y = Math.floor(mouse.y/canvas.height*size)+1;
        grainIdValue.innerHTML = space.lattice[this.x][this.y].ID; 
        grainColorValue.innerHTML = space.lattice[this.x][this.y].color;
        grainCurrentID.innerHTML = space.currentId-1;
        if(drawMode){
            findxy('move', event);
        }
});
canvas.addEventListener("mousedown", function (e) {
    if(drawMode)
    findxy('down', e)
}, false);
canvas.addEventListener("mouseup", function (e) {
    if(drawMode)
    findxy('up', e)
}, false);

let sliderSize = document.getElementById("size");
let sliderSizeValue = document.getElementById("sizeValue");
sliderSizeValue.innerHTML = sliderSize.value;
size = Number(sliderSize.value);
console.log(size);

let sliderNucleons = document.getElementById("nucleons");
let sliderNucleonsValue = document.getElementById("nucleonsValue");
sliderNucleonsValue.innerHTML = sliderNucleons.value;
nucleons = Number(sliderNucleons.value);
console.log(nucleons);


function Cell(x, y, s){
    this.ID = x;
    this.color = y;
    this.seed = s;
};



function Space(size){
    this.size = size+2;
    this.emptyCells = 0;
    this.currentId = 1;
    this.lattice = new Array(this.size);
    this.latticeTemp = new Array(this.size);
    

    this.init = function(){
        this.emptyCells = (this.size-2)*(this.size-2);
        for(var i=0; i<this.size;i++){
            this.lattice[i] = new Array(this.size);
            this.latticeTemp[i] = new Array(this.size);
        }
        for(var i=0;i<this.size;++i){
            for(j=0;j<this.size;++j){
                this.lattice[i][j]=new Cell(0,'#000000', false);
                this.latticeTemp[i][j]=new Cell(0,'#000000', false);
            }
        }
    };

    this.neumann = function(x,y){
        id = new Array(4);
        n = new Array(4);
        col = new Array(4);
        for(i=0;i<4;++i){
            id[i]=0;
            n[i]=0;
            col[i] = '#000000';
        }

        for(var i=-1;i<2;++i){
            for(var j=-1;j<2;++j){
                if (i == 0 && j == 0) continue;
                if (i == -1 && j == -1) continue;
                if (i == -1 && j == 1) continue;
                if (i == 1 && j == -1) continue;
                if (i == 1 && j == 1) continue;
                if(this.lattice[x+i][y+j].ID == 0) continue;

                for (var w=0;w<4;++w){
                    if(id[w] == this.lattice[x+i][y+j].ID){
                        n[w]++;
                        break;
                    }else{
                        if(id[w]==0){
                            id[w]=this.lattice[x+i][y+j].ID;
                            col[w]=this.lattice[x+i][y+j].color;
                            n[w]++;
                            break;
                        }
                    }
                }
            }
        }

        max = Math.max(...n);
        nn =[];
        cl =[];
        q=0;
        for(var i=0;i<4;++i){
            if(n[i]==max){
                nn.push(id[i]);
                cl.push(col[i]);
                q++;
            }
        }

        if(q==1){
            return new Cell(nn[0],cl[0]);
            return nn[0];
        }
        else{
            rnd = Math.floor(Math.random() * nn.length);
            return new Cell(nn[rnd],cl[rnd]);
            return nn[rnd];
        }
    };

    this.moore = function(x,y){
        let number = 8;
        id = new Array(number);
        n = new Array(number);
        col = new Array(number);
        for(i=0;i<number;++i){
            id[i]=0;
            n[i]=0;
            col[i] = '#000000';
        }

        for(var i=-1;i<2;++i){
            for(var j=-1;j<2;++j){
                if (i == 0 && j == 0) continue;
                if(this.lattice[x+i][y+j].ID == 0) continue;

                for (var w=0;w<number;++w){
                    if(id[w] == this.lattice[x+i][y+j].ID){
                        n[w]++;
                        break;
                    }else{
                        if(id[w]==0){
                            id[w]=this.lattice[x+i][y+j].ID;
                            col[w]=this.lattice[x+i][y+j].color;
                            n[w]++;
                            break;
                        }
                    }
                }
            }
        }

        max = Math.max(...n);
        nn =[];
        cl =[];
        q=0;
        for(var i=0;i<number;++i){
            if(n[i]==max){
                nn.push(id[i]);
                cl.push(col[i]);
                q++;
            }
        }

        if(q==1){
            return new Cell(nn[0],cl[0]);
            return nn[0];
        }
        else{
            rnd = Math.floor(Math.random() * nn.length);
            return new Cell(nn[rnd],cl[rnd]);
            return nn[rnd];
        }
    };

    this.pentagonal = function(x,y){
        let number = 5;
        id = new Array(number);
        n = new Array(number);
        col = new Array(number);

        let u = Math.floor(Math.random()*5) + 1;

        for(i=0;i<number;++i){
            id[i]=0;
            n[i]=0;
            col[i] = '#000000';
        }

        for(var i=-1;i<2;++i){
            for(var j=-1;j<2;++j){
                if (i == 0 && j == 0) continue;
                if(this.lattice[x+i][y+j].ID == 0) continue;

                switch(u){
                    case 1:
                        if (i == -1 && j == -1) continue;
                        if (i == -1 && j == 0) continue;
                        if (i == -1 && j == 1) continue;
                    break;

                    case 2:
                        if (i == 1 && j == -1) continue;
                        if (i == 1 && j == 0) continue;
                        if (i == 1 && j == 1) continue;
                    break;

                    case 3:
                        if (i == -1 && j == -1) continue;
                        if (i == 0 && j == -1) continue;
                        if (i == 1 && j == -1) continue;
                    break;

                    case 4:
                        if (i == -1 && j == 1) continue;
                        if (i == 0 && j == 1) continue;
                        if (i == 1 && j == 1) continue;
                    break;
                }

                for (var w=0;w<number;++w){
                    if(id[w] == this.lattice[x+i][y+j].ID){
                        n[w]++;
                        break;
                    }else{
                        if(id[w]==0){
                            id[w]=this.lattice[x+i][y+j].ID;
                            col[w]=this.lattice[x+i][y+j].color;
                            n[w]++;
                            break;
                        }
                    }
                }
            }
        }

        max = Math.max(...n);
        nn =[];
        cl =[];
        q=0;
        for(var i=0;i<number;++i){
            if(n[i]==max){
                nn.push(id[i]);
                cl.push(col[i]);
                q++;
            }
        }

        if(q==1){
            return new Cell(nn[0],cl[0]);
            return nn[0];
        }
        else{
            rnd = Math.floor(Math.random() * nn.length);
            return new Cell(nn[rnd],cl[rnd]);
            return nn[rnd];
        }
    };

    this.hexagonal = function(x,y){
        let number = 5;
        id = new Array(number);
        n = new Array(number);
        col = new Array(number);

        let u = Math.floor(Math.random()*3) + 1;

        for(i=0;i<number;++i){
            id[i]=0;
            n[i]=0;
            col[i] = '#000000';
        }

        for(var i=-1;i<2;++i){
            for(var j=-1;j<2;++j){
                if (i == 0 && j == 0) continue;
                if(this.lattice[x+i][y+j].ID == 0) continue;

                switch(u){
                    case 1:
                        if (i == -1 && j == 1) continue;
                        if (i == 1 && j == -1) continue;
                    break;

                    case 2:
                        if (i == -1 && j == -1) continue;
                        if (i == 1 && j == 1) continue;
                    break;
                }

                for (var w=0;w<number;++w){
                    if(id[w] == this.lattice[x+i][y+j].ID){
                        n[w]++;
                        break;
                    }else{
                        if(id[w]==0){
                            id[w]=this.lattice[x+i][y+j].ID;
                            col[w]=this.lattice[x+i][y+j].color;
                            n[w]++;
                            break;
                        }
                    }
                }
            }
        }

        max = Math.max(...n);
        nn =[];
        cl =[];
        q=0;
        for(var i=0;i<number;++i){
            if(n[i]==max){
                nn.push(id[i]);
                cl.push(col[i]);
                q++;
            }
        }

        if(q==1){
            return new Cell(nn[0],cl[0]);
            return nn[0];
        }
        else{
            rnd = Math.floor(Math.random() * nn.length);
            return new Cell(nn[rnd],cl[rnd]);
            return nn[rnd];
        }
    };

    this.user = function(x,y){
        let number = 8;
        id = new Array(number);
        n = new Array(number);
        col = new Array(number);
        for(i=0;i<number;++i){
            id[i]=0;
            n[i]=0;
            col[i] = '#000000';
        }

        for(var i=-1;i<2;++i){
            for(var j=-1;j<2;++j){
                if (i == 0 && j == 0) continue;
                if(this.lattice[x+i][y+j].ID == 0) continue;

                if (i == -1 && j == -1)if(!teofils[7].checked)continue; 
                if (i == -1 && j == 0) if(!teofils[4].checked) continue;
                if (i == -1 && j == 1) if(!teofils[2].checked) continue;
                if (i == 0 && j == -1) if(!teofils[6].checked) continue;
                if (i == 0 && j == 1)  if(!teofils[1].checked)continue;
                if (i == 1 && j == -1) if(!teofils[5].checked) continue;
                if (i == 1 && j == 0)  if(!teofils[3].checked)continue;
                if (i == 1 && j == 1)  if(!teofils[0].checked)continue;

                for (var w=0;w<number;++w){
                    if(id[w] == this.lattice[x+i][y+j].ID){
                        n[w]++;
                        break;
                    }else{
                        if(id[w]==0){
                            id[w]=this.lattice[x+i][y+j].ID;
                            col[w]=this.lattice[x+i][y+j].color;
                            n[w]++;
                            break;
                        }
                    }
                }
            }
        }

        max = Math.max(...n);
        nn =[];
        cl =[];
        q=0;
        for(var i=0;i<number;++i){
            if(n[i]==max){
                nn.push(id[i]);
                cl.push(col[i]);
                q++;
            }
        }

        if(q==1){
            return new Cell(nn[0],cl[0]);
            return nn[0];
        }
        else{
            rnd = Math.floor(Math.random() * nn.length);
            return new Cell(nn[rnd],cl[rnd]);
            return nn[rnd];
        }
    };
    this.update = function(type, periodic){

        // this.lattice[0] = this.lattice[this.size-2];
        // this.lattice[this.size-1]=this.lattice[1];
        if(periodic){
            for(let i =0;i<this.size;++i){
                this.lattice[0][i] = this.lattice[this.size-2][i];
                this.lattice[this.size-1][i]=this.lattice[1][i];
            }
    
            for(let i = 0; i<this.size; ++i){
                this.lattice[i][0] = this.lattice[i][this.size-2];
                this.lattice[i][this.size-1] = this.lattice[i][1];
            }
        }

        for(var i=0;i<this.size;++i){
            for(var j=0;j<this.size;++j){
                this.latticeTemp[i][j] = this.lattice[i][j];
            }
        }
        // this.IDTemp = this.ID.slice();
        for(var i=1;i<this.size-1;++i){
            for(var j=1;j<this.size-1;++j){
                if(this.lattice[i][j].ID == 0){
                    switch(type){
                        case 'neumann':
                            t = this.neumann(i,j);
                        break;
                        case 'moore':
                            t = this.moore(i,j);
                        break;
                        case 'pentagonal':
                            t = this.pentagonal(i,j);
                        break;
                        case 'hexagonal':
                            t = this.hexagonal(i,j);
                        break; 
                        case 'user':
                            t = this.user(i,j);
                        break;
                        default:
                            t = this.neumann(i,j);
                    }
                    
                    if(t.ID!=0){
                        this.latticeTemp[i][j] = t;
                        --this.emptyCells;
                    }
                }
            }
        }
        // this.ID = this.IDTemp.slice();
        for(var i=0;i<this.size;++i){
            for(var j=0;j<this.size;++j){
                this.lattice[i][j] = this.latticeTemp[i][j];
            }
        }
    };

    this.setSeeds = function(num){
        array.push(num);
        for(var i=0;i<num;++i){
            x=Math.floor(Math.random() * (this.size-4)) + 2;
            y=Math.floor(Math.random() * (this.size-4)) + 2;
            array.push(x);
            array.push(y);
            if(this.lattice[x][y].ID == 0){
                r=Math.floor(Math.random() * 238 + 16);
                g=Math.floor(Math.random() * 238 + 16);
                b=Math.floor(Math.random() * 238 + 16);
                this.lattice[x][y].color = "#" + r.toString(16).toUpperCase() +
                g.toString(16).toUpperCase()+
                b.toString(16).toUpperCase();
                this.lattice[x][y].ID = this.currentId;
                this.lattice[x][y].seed = true;
                ++this.currentId;
                --this.emptyCells;
            }
        }
    };
    this.setEven = function(){
        this.num = Math.floor(size/50)
        for(var i=0;i<this.num;++i){
            for(var j=0;j<this.num;++j){
                x = i*Math.floor(size/this.num)+Math.floor(Math.floor(size/this.num)/2);
                y = j*Math.floor(size/this.num)+Math.floor(Math.floor(size/this.num)/2);
                
                if(this.lattice[x][y].ID == 0){
                    r=Math.floor(Math.random() * 238 + 16);
                    g=Math.floor(Math.random() * 238 + 16);
                    b=Math.floor(Math.random() * 238 + 16);
                    this.lattice[x][y].color = "#" + r.toString(16).toUpperCase() +
                    g.toString(16).toUpperCase()+
                    b.toString(16).toUpperCase();
                    this.lattice[x][y].ID = this.currentId;
                    this.lattice[x][y].seed = true;
                    ++this.currentId;
                    --this.emptyCells;
                }
            }
        }
    };
    this.setLast = function(){
        for(var i=1;i<array[0];++i){
                x = array[i];
                y = array[i+1];
                
                if(this.lattice[x][y].ID == 0){
                    r=Math.floor(Math.random() * 238 + 16);
                    g=Math.floor(Math.random() * 238 + 16);
                    b=Math.floor(Math.random() * 238 + 16);
                    this.lattice[x][y].color = "#" + r.toString(16).toUpperCase() +
                    g.toString(16).toUpperCase()+
                    b.toString(16).toUpperCase();
                    this.lattice[x][y].ID = this.currentId;
                    this.lattice[x][y].seed = true;
                    ++this.currentId;
                    --this.emptyCells;
                }
        }
    };
    this.setSeed = function(x,y,id,color){
        this.lattice[x][y].ID = id;
        this.lattice[x][y].color = color;
        --this.emptyCells;
    };
}
function init(s){
    space = undefined;
    space = new Space(s);
    space.init();
    space.setSeeds(nucleons);
    drawing = new Drawing();
    drawing.init(space);
    grainCurrentID.innerHTML = space.currentId-1;
}
sliderSize.oninput = function(){
    sliderSizeValue.innerHTML = this.value;
    size = Number(this.value);
    //console.log(space);
    // init(size);

    // animate();
}

sliderNucleons.oninput = function(){
    sliderNucleonsValue.innerHTML = this.value;
    nucleons = Number(this.value);
    //console.log(space);
    // init(size);

    // animate();
}

function Drawing(){
    this.space;
    this.size;
    //this.squareSize = Math.floor(SIZE/this.size);
    this.squareSize;

    this.init = function(sp){
        this.space = sp;
        this.size = sp.size -2;
        // this.squareSize = Math.floor(canvas.width/this.size);
        this.squareSize = canvas.width/this.size;
    }

    this.update = function(type, periodic){
        while(space.emptyCells > 0){
            this.draw();
            space.update(type,periodic);
        }
    }
    this.drawSeeds = function(){
        c.clearRect(0,0,canvas.width,canvas.height);
        for(let i=1;i<this.size;++i){
            for(let j=1;j<this.size;++j){
                if(this.space.lattice[i][j].seed){
                    c.fillStyle = "white";
                    c.fillRect((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                }
            }
        }
    }
    this.draw = function(){
        if (this.space.emptyCells > 0){
            space.update(neighbourhood,periodic);
            c.clearRect(0,0,canvas.width,canvas.height);
            for(let i=1;i<this.size;++i){
                for(let j=1;j<this.size;++j){
                    // if(this.space.lattice[i][j].ID==0) continue;
                   
                    // c.beginPath();
                    // c.strokeStyle = "red";
                    // c.rect((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    // c.fillStyle = this.space.lattice[i][j].color;
                    // c.fill();
                    // c.stroke();
                    c.fillStyle = this.space.lattice[i][j].color;
                    if(this.space.lattice[i][j].seed){
                        c.fillStyle = "white";
                    }
                    c.fillRect((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    // if(this.space.lattice[i][j].seed){
                    //     //console.log(i+', '+j);
                    //     //drawBorder((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    //     c.beginPath();
                    //     c.strokeStyle = "white";
                    //     c.rect((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    //     c.fillStyle = "white";
                    //     c.fill();
                    //     c.stroke();
                    // }
                }
            }
            
        }
    }

    this.drawStep = function(){
        if (this.space.emptyCells > 0){
            space.update(neighbourhood,periodic);
            c.clearRect(0,0,canvas.width,canvas.height);
            for(let i=1;i<this.size;++i){
                for(let j=1;j<this.size;++j){
                    // if(this.space.lattice[i][j].ID==0) continue;
                   
                    // c.beginPath();
                    // c.strokeStyle = "red";
                    // c.rect((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    // c.fillStyle = this.space.lattice[i][j].color;
                    // c.fill();
                    // c.stroke();
                    c.fillStyle = this.space.lattice[i][j].color;
                    if(this.space.lattice[i][j].seed){
                        c.fillStyle = "white";
                    }
                    c.fillRect((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    // if(this.space.lattice[i][j].seed){
                    //     //console.log(i+', '+j);
                    //     //drawBorder((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    //     c.beginPath();
                    //     c.strokeStyle = "white";
                    //     c.rect((i-1)*this.squareSize,(j-1)*this.squareSize,this.squareSize,this.squareSize);
                    //     c.fillStyle = "white";
                    //     c.fill();
                    //     c.stroke();
                    // }
                }
            }
            
        }
    }
};

function animate(){
    requestAnimationFrame(animate);
    // c.clearRect(0,0,innerWidth,innerHeight);
    if(!play) return;
    drawing.draw();
}