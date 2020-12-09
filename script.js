let sections =[]
let player_1_out_disks=0;
let player_2_out_disks=0;
let dice = new Dice();
let players = ['1', '2']//player 1 is white player 2 is black
let currentplayer;
let istarget=false;
let first_x;
let first_y;
let source_section;
let playerexit={first:false,second:false}
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
function checkexit(){
    let numbers=0;
    if(currentplayer==1){
        if(playerexit.first==false){
            for(var i=20;i<26;i++){
                if(sections[i].player==1){
                    numbers+=sections[i].disks.length;
                }
            }
                if (numbers==15){
                    playerexit.first=true;
                    return true;
                }else{
                    console.log(numbers);
                    return false;
                }
             
        }else{
            return true;
        }
    }else{//esle if the current player is player 2
        if(playerexit.second==false){
            for(var i=7;i<13;i++){
                if(sections[i].player==2){
                    numbers+=sections[i].disks.length;
                }
            }
                if (numbers==15){
                    playerexit.second=true;
                    return true;
                }else{
                    console.log(numbers);
                    return false;
                }
             
        }else{
            return true;
        }
    }
}

function exit(){
    istarget=false;
    sections[first_x+first_y*13].changecolor();
    if(currentplayer==1){
        if(checkexit()){
            for(var i=0;i<dice.numbers.length;i++){
                if(source_section+dice.numbers[i]==26){
                    sections[source_section].pop_stack();
                    dice.delete(i);
                    player_1_out_disks++;
                    
                    break;
                }  
            }
            if(dice.numbers.length==0){
                if(currentplayer==1){
                    currentplayer=2; turnDom.textContent=currentplayer;
                }else {currentplayer=1; turnDom.textContent=currentplayer;}
                dice.roll();
            }
        }else{
            alert('player 1 \n you should first move all your disks to your part')
        }
    }else{
        if(checkexit()){
            for(var i=0;i<dice.numbers.length;i++){
                if(source_section+dice.numbers[i]==13){
                    sections[source_section].pop_stack();
                    dice.delete(i);
                    player_2_out_disks++;
                    break;
                }

            }
            if(dice.numbers.length==0){
                if(currentplayer==1){
                    currentplayer=2; turnDom.textContent=currentplayer;
                }else {currentplayer=1; turnDom.textContent=currentplayer;}
                dice.roll();
                }

        }else{
            alert('player 2 \n you should first move all your disks to your part')
        }

    }
}
function nextturn(){
    if(currentplayer==1){
        currentplayer=2; turnDom.textContent=currentplayer;
    }else {currentplayer=1; turnDom.textContent=currentplayer;}
    dice.roll();
}
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
   /* adddisk(1,4,0);adddisk(1,1,5);adddisk(0,8,7);adddisk(0,3,8);adddisk(0,2,9)
    adddisk(0,2,10);adddisk(1,1,15);adddisk(1,6,20);adddisk(1,1,21); adddisk(1,1,23) ;adddisk(1,1,25) */
}

function checkdice(source,target){
   
    checkexit();
    if(currentplayer==1){
        
        if(source==6 || source==19){
            let diffrence=13-target;
            for(var i=0 ; i<dice.numbers.length;i++){
                if(diffrence==dice.numbers[i]){
                    dice.delete(i);
                    return true;
                }      
            }

        }else{
            if(source<13 && target<13){//if source and target are in the upside of board
                let diffrence = source-target;
                if(diffrence<0) return  false;
                if((source >6 && target <6) ||(target<6 && source>6) ){//source and target are in the upside and diffrent parts
                    diffrence=diffrence-1;
                    for(var i=0 ; i<dice.numbers.length;i++){
                        if(diffrence==dice.numbers[i]){
                            dice.delete(i);
                            return true;
                        }      
                    }
                }else{//source and target are in the upside and same parts
                    for(var i=0 ; i<dice.numbers.length;i++){
                        if(diffrence==dice.numbers[i]){
                            dice.delete(i);
                            return true;
                        }
                    }
                }       
                    }
                    // if both source and target are in the downside of board
                    else if(source>12 && target >12) {
                        let diffrence = target-source;
                        if(diffrence<0) return false;
                        if(target>19 &&  source <19){// source and target are in the downside and diffrent parts
                            diffrence=diffrence-1;
                            for(var i=0 ; i<dice.numbers.length;i++){
                                if(diffrence==dice.numbers[i]){
                                    dice.delete(i);
                                    return true;
                                }      
                            }
                        }else{//source and target are in the downside and same parts
                            diffrence=diffrence;
                            for(var i=0 ; i<dice.numbers.length;i++){
                                if(diffrence==dice.numbers[i]){
                                    dice.delete(i);
                                    return true;
                                }      
                        } 
                    }
                    }if(source<13 && target >12){// source is upside target is downside
                        let diffrence = target-(12-source);
                        for(var i=0 ; i<dice.numbers.length;i++){
                            if(diffrence==dice.numbers[i]){
                                dice.delete(i);
                                return true;
                            }      
                    } 
                    }
        }

            }
            // if currentplayer is 2 ;
            else{
                if(source==6 ||  source==19){//if the disk is on the middle
                    let diffrence=(25-target)+1;
                    for(var i=0 ; i<dice.numbers.length;i++){
                        if(diffrence==dice.numbers[i]){
                            dice.delete(i);
                            return true;
                        }      
                    }


                }else{
                    if(source<13 && target<13){//if source and target are in the upside of board
                        let diffrence = target-source;
                        if(diffrence<0) return  false;
                        if((target >6 && source <6) ||(source<6 && target>6) ){//source and target are in the upside and diffrent parts
                            diffrence=diffrence-1;
                            for(var i=0 ; i<dice.numbers.length;i++){
                                if(diffrence==dice.numbers[i]){
                                    dice.delete(i);
                                    return true;
                                }      
                            } return false;
                        }else{//source and target are in the upside and same parts
                            for(var i=0 ; i<dice.numbers.length;i++){
                                if(diffrence==dice.numbers[i]){
                                    dice.delete(i);
                                    return true;
                                }
                            }
                        }       
                            }
                        // if both source and target are in the downside of board
                    else if(source>12 && target >12) {
                        let diffrence = source-target;
                        if(diffrence<0) return false;
                        if(source>19 &&  target <19){// source and target are in the downside and diffrent parts
                            diffrence=diffrence-1;
                            for(var i=0 ; i<dice.numbers.length;i++){
                                if(diffrence==dice.numbers[i]){
                                    dice.delete(i);
                                    return true;
                                }      
                            }
                        }else{//source and target are in the downside and same parts
                            diffrence=diffrence;
                            for(var i=0 ; i<dice.numbers.length;i++){
                                if(diffrence==dice.numbers[i]){
                                    dice.delete(i);
                                    return true;
                                }      
                        } 
                    }
                    }if(source>=13 && target <12){// source is upside target is downside
                        let diffrence = target-(12-source);
                        for(var i=0 ; i<dice.numbers.length;i++){
                            if(diffrence==dice.numbers[i]){
                                dice.delete(i);
                                return true;
                            }      
                    } 
    
                    }

                }
               

            }   
            return false;
    }
   
function engine(source,target){
    if(player_1_out_disks==15){
        alert('player 1 won');
        return;
    }
    if(player_2_out_disks==15){
        alert('player 2 won');
        return;
    }

    if(source>25 || target>25){
        alert('err')
        return "cant move";
    }
    
    if(sections[source].disks.length==0 && source!=6 && source!=19){
        alert("you can't waste your turn \n source is empty what you want to move :|")
            return;
    }
    if(sections[source].player != currentplayer && source!=6 && source!=19 ){
        alert('it is not your turn');
        return;}
    if(target ==6 || target==19){
        alert('you cant move to the middle !');
        return;
    }
    
    if(source ==6 || source ==19){
        if(currentplayer==1){
            if(sections[6].player.player1==false){
                alert("you can't waste your turn \n source is empty what you want to move :|")
                return;}
                if(sections[target].player!=1 && sections[target].disks.length >1){
                    alert('you cant move there because it is full of enemy !')
                    return;}
        }else{
            if(sections[6].player.player2==false){
                alert("you can't waste your turn \n source is empty what you want to move :|")
                return;
            }
            if(sections[target].player!=2 && sections[target].disks.length >1){
                alert('you cant move there because it is full of enemy !')
                return;}

        }
    }
    if(currentplayer==1 && source!=6 && source !=19){
        if(sections[6].player.player1==true){
            alert("you have a disk in the middle please move that first");
            return;
        }
       
    }else if(currentplayer==2 &&source!=6 &&source !=19){
        if(sections[6].player.player2==true){
            alert("you have a disk in the middle please move that first");
        return;
        }
    }
    if(source==target){
        alert("you can't waste your turn")
            return;}
    if(sections[source].player !=sections[target].player && sections[target].disks.length >1 && source!=6 && source!=19){
        alert('you cant move there because it is full of enemy !')
        return;}
        
        if(checkdice(source,target)){
            if(sections[source].player!=sections[target].player &&source!=6 && source!=19 ){
             move(target,6);//first move the enemy disk to the middle !
            }
            if(source ==6 ||source==19){
                if(currentplayer==1){
                    if(sections[target].player!==1){
                        move(target,6);
                    }
                }else{
                    if(sections[target].player!==2){
                        move(target,6);
                    }
                }
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
    if(source==6 || source==19){
        if(currentplayer==1){
            let color =sections[source].pop_stack(1);
        console.log(`color : ${color}`)
        sections[target].add(1)
        return;

        }else{
            let color =sections[source].pop_stack(0);
            console.log(`color : ${color}`)
            console.log('lolland22')
            sections[target].add(0)
            return;

        }
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
            source_section=first_x+first_y*13;
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
     for(let i=0;i<sections.length;i++){
         for(let j=0;j<sections[i].disks.length;j++){
             if(i!=6 && i!=19){
                 sections[i].disks[j].render()     ;           }
         }
     }
     for(let i=0;i<sections[6].player1_disks.length;i++){
         sections[6].player1_disks[i].render()
     }
     for(let i=0;i<sections[6].player2_disks.length;i++){
         sections[6].player2_disks[i].render()
     }
    if(player_1_out_disks==15){
        alert("player 1 wins");
        return;
    }
    if(player_2_out_disks==15){
        alert("player 2 wins");
        return;
    }
 
        
}

