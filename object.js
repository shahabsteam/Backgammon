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
        this.text= document.getElementById("dice");
        this.numbers=[];

        
    }
    show(){
       this.text.innerText=" number of dices:"
       for (let i=0;i<this.numbers.length;i++){
            this.text.innerText+=` ${this.numbers[i]} ,`
       }
    }
    roll(){
        removeElements();
       this. numbers=[];
        let dice_1= math.floor(random(1, 7)) ;
        numbers.push(dice_1);
        let dice_2 = Math.floor(random(1,7)) ;
        numbers.push(dice_2);
        this.text.text
        if (dice_1==dice_2){
            number.push(dice_1);
            numbers.push(dice_2);
            this.show();

        }
        return numbers;
    }
}

class Checker  {
    constructor( barIndex,color) {
      this.x = 0;
      this.y = 0;
      this.width =20;
      this.height = 20;
      this.barIndex = barIndex;
      this.color = color;
    }
  
    move(dir, speed, targetX, diskX) {
      switch (dir) {
        case 'right':
          this.x += min(speed, Math.abs(targetX - diskX));
          break;
        case 'left':
          this.x -= min(speed, Math.abs(targetX - diskX));
          break;
        case 'up':
          this.y -= speed;
          break;
        case 'down':
          this.y += speed;
          break;
        default:
          break;
      }
    }
}
class AnimationHandler {
    constructor() {
      this.state = 'free';
      this.animations = [];
    }
    push(animation) {
      this.state = 'busy';
      this.animations.push(animation);
    }

    pop() {
      return this.animations.pop();
    }
  
    run() {
      if (this.animations.length === 0) {
        if (this.state == 'busy') {
          this.state = 'done';
        } else {
          this.state = 'free';
        }
      } else {
        this.state = 'busy';
        this.animations.slice(-1)[0].run();
      }
  
    }
  }
  class Section {
    constructor(x1, y1, x2, y2, x3,y3,i) {
      this.x1 = x1;
      this.x2 = x2;
      this.x3=x3;
      this.y1=y1;
      this.y2=y2;
      this.y3=y3;
     
      this.i = i;
    }  
    render() {
      push();
      fill(46,168,90);
      triangle(this.x1, this.y1,this.x2,this.y2,this.x3,this.y3);
      pop();
    }
    
}
class SectionAnimation {
    constructor(disk, action, condition, end, target) {
      this.disk = disk;
      this.action = action;
      this.condition = condition;
      this.end = end;
      this.target = target
    }
  
    run() {
      if (this.condition(this.disk)) {
        this.action(this.disk);
      } else {
        this.end(this.disk, this.target);
      }
    }
  }