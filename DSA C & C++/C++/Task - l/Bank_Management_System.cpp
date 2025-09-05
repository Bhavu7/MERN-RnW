// Simple Bank Management System

#include <iostream>
#include <string>
using namespace std;

// --------------------- Base Class ---------------------
class BankAccount {
protected:
    // Encapsulated attributes
    string accountNumber;
    string accountHolderName;
    double balance;

public:
    // Constructor
    BankAccount(string accNo, string accHolder, double bal) {
        accountNumber = accNo;
        accountHolderName = accHolder;
        balance = bal;
    }

    // destructor
    virtual ~BankAccount() {}

    // Method to deposit money
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: " << amount << " | New Balance: " << balance << endl;
        } else {
            cout << "Invalid deposit amount!" << endl;
        }
    }

    // Virtual method to withdraw money
    virtual void withdraw(double amount) {
        if (amount <= balance) {
            balance -= amount;
            cout << "Withdrew: " << amount << " | New Balance: " << balance << endl;
        } else {
            cout << "Insufficient balance!" << endl;
        }
    }

    // Getter for balance
    double getBalance() const {
        return balance;
    }

    // Display account details
    virtual void displayAccountInfo() {
        cout << "Account Number: " << accountNumber << endl;
        cout << "Account Holder: " << accountHolderName << endl;
        cout << "Balance: " << balance << endl;
    }

    // Virtual method
    virtual void calculateInterest() {
        cout << "Base account has no interest calculation." << endl;
    }
};

// --------------------- Derived Class: SavingsAccount ---------------------

class SavingsAccount : public BankAccount {
    double interestRate;

public:
    // Constructor (interest rate set by default)
    SavingsAccount(string accNo, string accHolder, double bal)
        : BankAccount(accNo, accHolder, bal), interestRate(2.5) {}

    // Overridden interest calculation method
    void calculateInterest() override {
        double interest = balance * interestRate / 100.0;
        cout << "Savings Interest (2.5%): " << interest << endl;
    }
};

// --------------------- Derived Class: CheckingAccount ---------------------

class CheckingAccount : public BankAccount {
    double overdraftLimit;

public:
    // Constructor (overdraft limit set by default)
    CheckingAccount(string accNo, string accHolder, double bal)
        : BankAccount(accNo, accHolder, bal), overdraftLimit(25000) {}

    // Overridden withdraw method
    void withdraw(double amount) override {
        if (amount <= balance + overdraftLimit) {
            balance -= amount;
            cout << "Withdrew: " << amount << " | New Balance: " << balance << endl;
        } else {
            cout << "Overdraft limit exceeded!" << endl;
        }
    }

    // Check if account is in overdraft
    void checkOverdraft() {
        if (balance < 0) {
            cout << "Account is in overdraft!" << endl;
        } else {
            cout << "No overdraft." << endl;
        }
    }
};

// --------------------- Derived Class: FixedDepositAccount ---------------------

class FixedDepositAccount : public BankAccount {
	// Duration in months
    int term;
    double interestRate;

public:
    // Constructor (interest rate set by default)
    FixedDepositAccount(string accNo, string accHolder, double bal, int t)
        : BankAccount(accNo, accHolder, bal), term(t), interestRate(8.5) {}

    // Overridden interest calculation method
    void calculateInterest() override {
        double interest = balance * interestRate * term / (12 * 100.0);
        cout << "FD Interest (" << interestRate << "% for " << term
             << " months): " << interest << endl;
    }
};

// --------------------- Menu-Driven Banking System ---------------------

int main() {
	// Accounts Limit
    const int MAX_ACCOUNTS = 100;
    // Array of base class pointers
    BankAccount* accounts[MAX_ACCOUNTS];
    
    // Current number of accounts
    int accountCount = 0;

    int choice;
    do {
        // Display menu
        cout << "\n------ Banking System Menu ------\n";
        cout << "1. Create Savings Account\n";
        cout << "2. Create Checking Account\n";
        cout << "3. Create Fixed Deposit Account\n";
        cout << "4. Deposit\n";
        cout << "5. Withdraw\n";
        cout << "6. Display Account Info\n";
        cout << "7. Calculate Interest\n";
        cout << "8. Exit\n";
        cout << "---------------------------------\n"<<endl;
        cout << "---------------------------------"<<endl;
        cout << "Enter choice: ";
        cin >> choice;
        cout << "---------------------------------"<<endl;

        // Common input variables
        string accNo, accHolder;
        double balance, amount;
        int term, index;

        switch (choice) {
        // Create Savings Account
        case 1:
            if (accountCount < MAX_ACCOUNTS) {
                cout << "Enter Account No: "; cin >> accNo;
                cout << "Enter Holder Name: "; cin >> accHolder;
                cout << "Enter Initial Balance: "; cin >> balance;
                accounts[accountCount++] = new SavingsAccount(accNo, accHolder, balance);
                cout << "---------------------------------"<<endl;
                cout << "Savings Account Created!\n";
                cout << "---------------------------------\n\n"<<endl;
            }
            break;

		// Create Checking Account
        case 2:
            if (accountCount < MAX_ACCOUNTS) {
                cout << "Enter Account No: "; cin >> accNo;
                cout << "Enter Holder Name: "; cin >> accHolder;
                cout << "Enter Initial Balance: "; cin >> balance;
                accounts[accountCount++] = new CheckingAccount(accNo, accHolder, balance);
                cout << "---------------------------------"<<endl;
                cout << "Checking Account Created!\n";
                cout << "---------------------------------\n\n"<<endl;
            }
            break;
		
		// Create Fixed Deposit Account
        case 3:
            if (accountCount < MAX_ACCOUNTS) {
                cout << "Enter Account No: "; cin >> accNo;
                cout << "Enter Holder Name: "; cin >> accHolder;
                cout << "Enter Initial Balance: "; cin >> balance;
                cout << "Enter Term (months): "; cin >> term;
                accounts[accountCount++] = new FixedDepositAccount(accNo, accHolder, balance, term);
                cout << "---------------------------------"<<endl;
                cout << "Fixed Deposit Account Created!\n";
                cout << "---------------------------------\n\n"<<endl;
            }
            break;

		// Deposit money
        case 4:
            cout << "Enter Account Index: "; cin >> index;
            // Index starts from 1
            index -= 1;
            cout << "Enter Amount to Deposit: "; cin >> amount;
            cout << " "<<endl;
            if (index >= 0 && index < accountCount) accounts[index]->deposit(amount);
            break;
		
		// Withdraw money
        case 5:
            cout << "Enter Account Index: "; cin >> index;
            // Index starts from 1
            index -= 1;
            cout << "Enter Amount to Withdraw: "; cin >> amount;
            cout << " "<<endl;
            if (index >= 0 && index < accountCount) accounts[index]->withdraw(amount);
            break;
		
		// Display account info
        case 6:
            cout << "Enter Account Index: "; cin >> index;
            // Index starts from 1
            index -= 1;
            cout << " "<<endl;
            if (index >= 0 && index < accountCount) accounts[index]->displayAccountInfo();
            break;
        
		// Calculate interest
        case 7:
            cout << "Enter Account Index: "; cin >> index;
            // Index starts from 1
            index -= 1;
            cout << " "<<endl;
            if (index >= 0 && index < accountCount) accounts[index]->calculateInterest();
            break;
            
		// Exit program
        case 8:
            cout << "Exiting..." << endl;
            break;

        default:
            cout << "Invalid Choice!" << endl;
        }
    } while (choice != 8);

    // Clears Memory
    for (int i = 0; i < accountCount; i++) {
        delete accounts[i];
    }

    return 0;
}
