class Product {
    constructor(id, name, price, stock) {
      this.id = id;
      this.name = name;
      this._price = price;
      this._stock = stock;
    }
  
    get price() {
      return this._price;
    }
    set price(newPrice) {
      if (newPrice < 0) throw new Error("가격은 음수일 수 없습니다");
      this._price = newPrice;
    }
  
    get stock() {
      return this._stock;
    }
    set stock(newStock) {
      if (newStock < 0) throw new Error("재고는 음수일 수 없습니다");
      this._stock = newStock;
    }
  
    checkStock(requiredQuantity) {
      return this._stock >= requiredQuantity;
    }
  
    reduceStock(quantity) {
      if (this._stock < quantity) throw new Error("재고 부족");
      this._stock -= quantity;
    }
  
    increaseStock(quantity) {
      this._stock += quantity;
    }
  }
  
  class ShoppingCart {
    constructor() {
      this.items = new Map(); // key: Product, value: quantity
    }
  
    addItem(product, quantity = 1) {
      if (!product.checkStock(quantity)) throw new Error("상품 재고 부족");
      const current = this.items.get(product) || 0;
      this.items.set(product, current + quantity);
    }
  
    removeItem(product) {
      this.items.delete(product);
    }
  
    updateQuantity(product, newQuantity) {
      if (newQuantity <= 0) {
        this.items.delete(product);
      } else {
        this.items.set(product, newQuantity);
      }
    }
  
    get total() {
      let sum = 0;
      for (const [product, quantity] of this.items) {
        sum += product.price * quantity;
      }
      return sum;
    }
  
    clear() {
      this.items.clear();
    }
  }
  
  class User {
    constructor(id, name, email) {
      this.id = id;
      this.name = name;
      this.email = email;
      this._cart = new ShoppingCart();
    }
  
    get cart() {
      return this._cart;
    }
  
    addToCart(product, quantity = 1) {
      this._cart.addItem(product, quantity);
    }
  
    placeOrder() {
      const order = new Order(this, this._cart);
      order.process();
      this._cart.clear();
      return order;
    }
  }
  
  class Order {
    static statuses = ['pending', 'shipped', 'delivered', 'cancelled'];
    
    constructor(user, cart) {
      this.orderId = Date.now().toString();
      this.user = user;
      this.items = new Map(cart.items);
      this._status = Order.statuses[0];
    }
  
    get total() {
      let sum = 0;
      for (const [product, quantity] of this.items) {
        sum += product.price * quantity;
      }
      return sum;
    }
  
    get status() {
      return this._status;
    }
    set status(newStatus) {
      if (!Order.statuses.includes(newStatus)) {
        throw new Error("유효하지 않은 주문 상태");
      }
      this._status = newStatus;
    }
  
    process() {
      for (const [product, quantity] of this.items) {
        if (!product.checkStock(quantity)) {
          throw new Error(`[${product.name}] 재고 부족으로 주문 실패`);
        }
      }
      for (const [product, quantity] of this.items) {
        product.reduceStock(quantity);
      }
      this.status = 'shipped';
    }
  
    cancel() {
      if (this.status === 'cancelled') return;
      for (const [product, quantity] of this.items) {
        product.increaseStock(quantity);
      }
      this.status = 'cancelled';
    }
  }
  
  // 사용 예시
  const shirt = new Product(1, "면티셔츠", 20000, 10);
  const jeans = new Product(2, "청바지", 50000, 5);
  
  const user = new User("user01", "김코딩", "coding@example.com");
  
  user.addToCart(shirt, 2);
  user.addToCart(jeans, 1);
  
  try {
    const order = user.placeOrder();
    console.log("주문 완료:", order.total); // 90000
    console.log("남은 재고:", shirt.stock); // 8
  
    // 주문 취소
    order.cancel();
    console.log("취소 후 재고:", shirt.stock); // 10
    console.log("주문 상태:", order.status); // cancelled
  } catch (error) {
    console.error("주문 실패:", error.message);
  }
  