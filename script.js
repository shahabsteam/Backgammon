let sections = []



    for(var j=0;j<=12;j++){
        if(j==6)
            continue;
        sections.push(new Section(5+90*j, 5, 45+90*j, 300, 85+90*j,5))
    }
    for(var j=0;j<=12;j++){
        if(j==6)
            continue;
        sections.push(new Section(5+90*j, 800, 45+90*j, 500, 85+90*j,800));
    }

let players = ['1', '2']
let currentplayer=random(players);
function setup(){
    let mycanvas =createCanvas(1200, 800)
    mycanvas.parent('#sec')
    
    
}
animator = new AnimationHandler();
function mousePressed() {
    let x1 =Math.floor( map(mouseX, 0, width-100, 0, 12));
    let y1= Math.floor(map(mouseY,0,height,0,2)) ;
    console.log(x1,y1)
    if (animator.state == 'busy'){
        return;
    } else{
    }


  }

function draw (){
        background(235);
       push()
       fill(210)
        rect(565, 0, 50, 1200)
        pop()
        sections.forEach((section) => section.render());


}

