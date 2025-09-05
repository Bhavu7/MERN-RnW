#include <iostream>
#include <string>
using namespace std;

// Base/Parent class
class Account {
protected:
    string accountHolder;
    int accountNumber;
    double balance;

private:
    int pin;

public:
    // Method to set account details
    void setAccountData(string holder, int accNum, double initialBal, int p) {
        accountHolder = holder;
        accountNumber = accNum;
        balance = initialBal;
        pin = p;
    }

    // PIN verification
    bool verifyPin(int enteredPin) {
        return (enteredPin == pin);
    }

    // Display account info
    void displayAccountInfo() {
        cout << "\n--- Account Information ---" << endl;
        cout << "Account Holder : " << accountHolder << endl;
        cout << "Account Number : " << accountNumber << endl;
        cout << "Your Balance : $" << balance << endl;
    }
};

// Derived/Child class
class ATM : public Account {
public:
    void deposit(double amount) {
        if (amount <= 0) {
            cout << "Invalid deposit amount!" << endl;
            return;
        }
        balance += amount;
        cout << "Deposited $" << amount << " in your account successfully." << endl;
    }

    void withdraw(double amount) {
        if (amount <= 0) {
            cout << "Invalid withdrawal amount!" << endl;
        } else if (amount > balance) {
            cout << "Insufficient balance!" << endl;
        } else {
            balance -= amount;
            cout << "Withdrew $" << amount << " from your account successfully." << endl;
        }
    }

    void checkBalance() {
        cout << "Current Balance : $" << balance << endl;
    }
};

int main() {
    string name;
    int accNum, pin;
    double initialBal;

    // Create account with user input
    cout << "Enter account holder name : ";
    getline(cin, name);
    cout << "Enter account number : ";
    cin >> accNum;
    cout << "Set a 4-digit PIN : ";
    cin >> pin;
    cout << "Enter initial balance : ";
    cin >> initialBal;

    ATM user;
    user.setAccountData(name, accNum, initialBal, pin);

    // Authenticate before menu
    int enteredPin, attempts = 3;
    bool authenticated = false;

    while (attempts > 0) {
        cout << "\nEnter your PIN to access the ATM: ";
        cin >> enteredPin;

        if (user.verifyPin(enteredPin)) {
            authenticated = true;
            cout << "Authentication successful!\n";
            break;
        } else {
            attempts--;
            cout << "Incorrect PIN! Attempts left : " << attempts << endl;
        }
    }

    if (!authenticated) {
        cout << "Account locked due to too many failed attempts.\n";
        return 0;
    }

    // ATM Menu
    int choice;
    double amount;
    do {
        cout << "\n--- ATM Menu ---\n";
        cout << "1. Display Account Info\n";
        cout << "2. Deposit\n";
        cout << "3. Withdraw\n";
        cout << "4. Check Balance\n";
        cout << "5. Exit\n";
        cout << "Enter choice: ";
        cin >> choice;

        switch (choice) {
            case 1:
                user.displayAccountInfo();
                break;
            case 2:
                cout << "Enter deposit amount: ";
                cin >> amount;
                user.deposit(amount);
                break;
            case 3:
                cout << "Enter withdrawal amount: ";
                cin >> amount;
                user.withdraw(amount);
                break;
            case 4:
                user.checkBalance();
                break;
            case 5:
                cout << "Exiting ATM. Thank you!" << endl;
                break;
            default:
                cout << "Invalid choice! Try again." << endl;
        }
    } while (choice != 5);

    return 0;
}

