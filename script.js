let sections =[]

let dice = new Dice();
let players = ['1', '2']//player 1 is white player 2 is black
let currentplayer;
let istarget=false;
let first_x;
let first_y;
let turnDom=document.getElementById('whoseturn')
let bar =new Bar(565,0,50,1200);
for(var i=0;i<2;i++){
    for(var j=0;j<=12;j++){
        if(j==6){
            sections.push(bar)
            continue;
        }
        sections.push(new Section(5+90*j, 5+i*805, 45+90*j, 300+200*i, 85+90*j,5+i*805 ,i))    
    }
}

//sections[0].disks.push(new Checker(12,0,30,70))
//sections[0].add(255)
//sections[0].add(255)
//sections[0].add(255)
//sections[13].add(255)
//sections[13].add(0)

function setup(){
    currentplayer=random(players);
    dice.roll();
    //img = loadImage('images/dice_1.png'); 
    let mycanvas =createCanvas(1200, 800)
    mycanvas.parent('#sec')
    turnDom.textContent=currentplayer;
    prepare()
    
    

}
function adddisk(color,count,id){
    for(let i=0;i<count;i++){
        sections[id].add(color)
    }
}
function prepare(){
    adddisk(1,5,0);
    adddisk(0,3,4);
    adddisk(0,5,7);
    adddisk(1,2,12);
    adddisk(0,5,13);
    adddisk(1,3,17);
    adddisk(1,5,20);
    adddisk(0,2,25);
}
function checkdice(source,target){
    if(currentplayer==1){
        if(source<13 && target<13){
            let diffrence = source-target;
            if(diffrence<0) return  false;
            
            
                    
                }
                // if
                else{

                }
            }
            // if currentplayer was 2 ;
            else{
                if(source<13 && target<13){
                    let diffrence = source-target;
                    if(diffrence>0) return false;
                            
                        }

                
            }
        
       

            return true;
    }
   
function engine(source,target){


    if(source>24 || target>24){
        return "cant move";
    }
    
    if(sections[source].disks.length==0){
        alert("you can't waste your turn \n source is empty what you want to move :|")
            return;
    }
    if(sections[source].player != currentplayer ){
        alert('it is not your turn');
        return;}
    if(target ==6 || target==19){
        alert('you cant move to the middle !');
        return;
    }
    if(sections[6].player==currentplayer && source!=6){
        alert("you have a disk in the middle please move that first");
        return;
    }
    if(source==target){
        alert("you can't waste your turn")
            return;}
    if(sections[source].player !=sections[target].player && sections[target].disks.length >1){
        alert('you cant move there because it is full of enemy !')
        return;}
        if(checkdice(source,target)){
            if(sections[source].player!=sections[target].player){
             move(target,6);//first move the enemy disk to the middle !
            }
            move(source,target)
            if(dice.numbers.length==0){
                if(currentplayer==1){
                    currentplayer=2; turnDom.textContent=currentplayer;
                }else {currentplayer=1; turnDom.textContent=currentplayer;}
                dice.roll();
            }
        }else{
            alert("invalid move")
            return;
        }
    }

function move(source , target){
    if(source>24 && target>24){
        return "cant move";
    }
    if (sections[source].disks.length == 0) return "Can't move!!!!";
      let color =sections[source].pop_stack();
      console.log(`color : ${color}`)
    sections[target].add(color)

}

function mousePressed() {
    let x1 =Math.floor( map(mouseX, 0, width-100, 0, 12));
    let y1= Math.floor(map(mouseY,0,height,0,2));
    console.log(`x1: ${x1} , y1: ${y1}`)
    if(x1+y1*12<=24 && y1>=0 && x1>=0){
        if (!istarget){
            first_x=x1;
            first_y=y1;
            istarget=true;
            sections[first_x+first_y*13].changecolor();
        }else{
            console.log(first_x+first_y*13,x1+y1*13)
           // move(first_x+first_y*13,x1+y1*13)
           engine(first_x+first_y*13,x1+y1*13)
            sections[first_x+first_y*13].changecolor();
            istarget=false;
        }
    }
  }

function draw (){
    
        background(235);
       push()
       fill(210)
        pop()
       // image(img, 20, 350, 100, 100)
       dice.render();
       frameRate(15)
        sections.forEach((section) => section.render());
        sections.forEach((section)=>{
            section.disks.forEach((checker)=>{
                checker.render();
            })

        })
}

