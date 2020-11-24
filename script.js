let sections =[]
let istarget=false;
let first_x;
let first_y;
let bar =new Bar(565,0,50,1200);

for(var i=0;i<2;i++){
    for(var j=0;j<12;j++){
        if(j==6){
            sections.push(bar)
            continue;
        }
            
        sections.push(new Section(5+90*j, 5+i*805, 45+90*j, 300+200*i, 85+90*j,5+i*805 ,i))    
    }
}
/*for(var j=0;j<=12;j++){
    if(j==6)
        continue;
    sections.push(new Section(5+90*j, 5, 45+90*j, 300, 85+90*j,5 ,0))
}
    for(var j=0;j<=12;j++){
        if(j==6)
            continue;
        sections.push(new Section(5+90*j, 800, 45+90*j, 500, 85+90*j,800,1));
    }*/
    
//sections[0].disks.push(new Checker(0,255,30,30))
//sections[0].disks.push(new Checker(12,0,30,70))
sections[0].add(255)
sections[0].add(255)
sections[13].add(255)
sections[13].add(0)
let players = ['1', '2']
let currentplayer=random(players);
function setup(){
    let mycanvas =createCanvas(1200, 800)
    mycanvas.parent('#sec')
    

}
function move(source , target){
    if(source>24 && target>24){
        return "cant move";
    }
    if (sections[source].disks.length == 0) return "Can't move!!!!";
      let color =sections[source].pop_stack();
    sections[target].add(color)

}

function mousePressed() {
    let x1 =Math.floor( map(mouseX, 0, width-100, 0, 12));
    let y1= Math.floor(map(mouseY,0,height,0,2));
    console.log(`x1: ${x1} , y1: ${y1}`)
    if (!istarget){
        first_x=x1;
        first_y=y1;
        istarget=true;
        sections[first_x+first_y*12].changecolor();
    }else{
        console.log(first_x+first_y*12,x1+y1*12)
        move(first_x+first_y*12,x1+y1*12)
        sections[first_x+first_y*12].changecolor();
        istarget=false;
    }
  
    



  }

function draw (){
        background(235);
       push()
       fill(210)
        
        pop()
        sections.forEach((section) => section.render());
        sections.forEach((section)=>{
            section.disks.forEach((checker)=>{
                checker.render();
            })

        })
}

