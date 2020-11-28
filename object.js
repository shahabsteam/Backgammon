class Stack{
    
    constructor(next){
        this.elements=[];
        this.next=next;
    }
    pop_stack(){
        if(this.elements.length!=0){
           return this.elements.pop();
        }else{
            
        }

    }
    push_stack(element){
        this.elements.push(element);

    }
}

class Dice{
    constructor(){
        //this.text= document.getElementById("dice");
        this.numbers=[];
        this.images=[];

        
    }
    
    roll(){
      this.numbers=[];
      this.images=[];
        let dice_1= Math.floor( Math.random() * 6 ) +1 ;
        this.numbers.push(dice_1);
        let dice_2 = Math.floor( Math.random() * 6 ) +1 ;
        this.numbers.push(dice_2);
        //this.text.text
        if (dice_1==dice_2){
            this.numbers.push(dice_1);
            this.numbers.push(dice_2);
            //this.show();

        }
        for(var i=0;i<this.numbers.length;i++){
         let img=loadImage(`images/dice_${this.numbers[i]}.png`)
          this.images.push(img);
       }
    }
    render(){
      
      let j=0;
      this.images.forEach(picture => {
        image(picture, 20+j*80, 350, 70, 70)
        j++;
        
      });

    }
    
    delete(number){
      this.numbers.splice(number,1);
      this.images.splice(number,1);
    }
}

class Checker  {
    constructor( barIndex,color,x,y) {
      this.x = x;
      this.y = y;
      this.width =40;
      this.height = 40;
      //this.barIndex = barIndex;
      if(color==1){
        this.color=255;
      }else{
        this.color=70
      }
      
    }
    render(){
      fill(this.color)
      
      ellipse(this.x,this.y,this.width,this.height)
    }
    returncolor(){
      if(this.color==255)
        return 1;
        if(this.color==70)
        return 0;
    }
}


  class Bar{
    constructor(x,y,width,height){
      this.player;
      this.disks=[];
      this.x=x;
      this.y=y;
      this.width=width;
      this.height=height;
      this.freeheight=400;
      this.color='rgba(37,0,200,0.35)'
      this.secondcolor='rgba(77,151,80,0.79)'
      this.maincolor='rgba(37,0,200,0.35)'
    }
    render(){
      push()
      fill(this.color)
      rect(this.x, this.y, this.width, this.height)
      pop()
    }
    add(color){
      
        if(color==1)
          this.player=1;
          else
          this.player=2;
        this.disks.push(new Checker(0,color,this.x+25,this.freeheight-50 ))
      this.freeheight+=30;
      
      
    }
    pop_stack(){
        
        this.freeheight-=30
     
      
      let returncolor= this.disks.pop().returncolor();
      if(this.disks.length==0){
        this.player=null;
      }
      return returncolor;
    }
    changecolor(){
      {
        if(this.color==this.maincolor){
          this.color=this.secondcolor;
        }else{
          
          this.color=this.maincolor;
        }
    }
    }  
    
  }  
  class Section {
    constructor(x1, y1, x2, y2, x3,y3,isdown) {
      this.disks = [];
      this.x1 = x1;
      this.x2 = x2;
      this.x3=x3;
      this.y1=y1;
      this.y2=y2;
      this.y3=y3;
     this.freeheight=y1+20;
      this.i = isdown;
      this.color='rgba(0,98,204,0.56)';
      this.maincolor='rgba(0,98,204,0.56)';
      this.secondcolor='rgba(77,151,80,0.79)';
      this.player;

    }
  
    add(color){
      if(color==1)
        this.player=1;
        else this.player=2;
      if(this.i==0){
        this.disks.push(new Checker(0,color,this.x2,this.freeheight))
      this.freeheight+=30;
      }
      if(this.i==1){
        this.disks.push(new Checker(0,color,this.x2,this.freeheight-50 ))
      this.freeheight-=30;
      }
      
    }
    pop_stack(){
      if(this.i==0){
        this.freeheight-=30
      }
      if(this.i==1){
        this.freeheight+=30
      }
      return this.disks.pop().returncolor();
    }  
    render() {
      push();
     // fill(46,168,90); green;
     fill(this.color);
      triangle(this.x1, this.y1,this.x2,this.y2,this.x3,this.y3);
      pop();
    }
    changecolor(){
        if(this.color==this.maincolor){
          this.color=this.secondcolor;
        }else{
          
          this.color=this.maincolor;
        }
    }
    
    
    
}
