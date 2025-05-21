class Shape {
  constructor() {
    if (this.constructor === Shape) {
      throw new Error("추상 클래스는 인스턴스화할 수 없습니다");
    }
  }
  
  area() {
    throw new Error("자식 클래스에서 area 메서드를 구현해야 합니다");
  }
  
  perimeter() {
    throw new Error("자식 클래스에서 perimeter 메서드를 구현해야 합니다");
  }
}

class Circle extends Shape {
  constructor(radius) {
    super();
    this.radius = radius;
  }
  
  area() {
    return Math.PI * this.radius ** 2;
  }

  perimeter() {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(width, height) {
    super();
    this.width = width;
    this.height = height;
  }
  
  area() {
    return this.width * this.height;
  }

  perimeter() {
    return 2 * (this.width + this.height);
  }
}

class Triangle extends Shape {
  constructor(a, b, c) {
    super();
    this.a = a;
    this.b = b;
    this.c = c;
  }
  
  area() {
    const s = (this.a + this.b + this.c) / 2;
    return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
  }

  perimeter() {
    return this.a + this.b + this.c ;
  }
}
 
class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  
  
  }
}
const circle = new Circle(3);
const rectangle = new Rectangle(4, 5);
const triangle = new Triangle(3, 4, 5);
const square = new Square(4);

console.log('Circle area:', circle.area());            
console.log('Rectangle perimeter:', rectangle.perimeter()); 
console.log('Triangle area:', triangle.area());       
console.log('Square area:', square.area());            
console.log('Square perimeter:', square.perimeter()); 