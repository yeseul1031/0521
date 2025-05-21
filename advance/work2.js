class BankAccount {
    constructor(accountNumber, ownerName, balance = 0) {
      this.accountNumber = accountNumber;
      this.ownerName = ownerName;
      this.balance = balance;
      
      // 추상 클래스 체크
      if (this.constructor === BankAccount) {
        throw new Error("BankAccount 클래스는 직접 인스턴스화할 수 없습니다");
      }
    }
    
    deposit(amount) {
      if (amount <= 0) {
        throw new Error("입금액은 0보다 커야 합니다");
      }
      this.balance += amount;
      return this.balance;
    }
    
    withdraw(amount) {
     if (amount <= 0) 
        throw new Error("출금액은 0보다 커야 합니다");
     if (this.balance < amount) 
        throw new Error("잔액이 부족합니다");
      this.balance -= amount;
      return this.balance;
    }
    
    getBalance() {
      return this.balance;
    }
  }

class checkingAccount extends BankAccount {
    constructor(accountNumberm, ownerName, balance = 0) {
        super(accountNumberm, ownerName, balance);
        this.checkBook = [];
    }

    issueCheck(checkNumber, amount) {
        this.checkBook.push({ checkNumber, amount });
        return `수표 ${checkNumber} 발행 (${amount}원)`;
      }
    }
    

class savingsAccount extends BankAccount {
    constructor(accountNumber, ownerName, balance = 0, interestRate = 0.01) {
      super(accountNumber, ownerName, balance);
      this.interestRate = interestRate;
    }
  
    calculateInterest() {
      const interest = this.balance * this.interestRate;
      this.deposit(interest); // 이자를 잔액에 추가
      return interest;
    }
  }

class Bank {
    constructor() {
        this.accounts = new Map();
    }
    addAccount(account) { 
        if(!(account instanceof BankAccount)) {
            throw new Error("유효한 계좌가 아닙니다.");
        }
        this.accounts.set(account.accountNumber, account);
    }

    getAccount(accountNumber) { 
        return this.accounts.get(accountNumber);
    }

    transferMoney(fromAccountNumber, toAccountNumber, amount) {
        const from = this.getAccount(fromAccountNumber);
        const to = this.getAccount(toAccountNumber);
        if (!from || !to)throw new Error("계좌가 존재하지 않습니다.");
        from.withdraw(amount);
        to.deposit(amount);
        return `${from.ownerName} -> ${to.ownerName} ${amount}원 송급완료`
    }
}

const myBank = new Bank();

// 계좌 생성
const checking = new checkingAccount("123-456", "김코딩", 50000);
const savings = new savingsAccount("789-012", "이자바", 100000, 0.02);

// 은행에 계좌 추가
myBank.addAccount(checking);
myBank.addAccount(savings);

// 기능 테스트
console.log(checking.issueCheck("C1001", 30000)); // 수표 발행
console.log(myBank.transferMoney("123-456", "789-012", 20000)); // 송금
console.log(savings.calculateInterest()); // 이자 계산