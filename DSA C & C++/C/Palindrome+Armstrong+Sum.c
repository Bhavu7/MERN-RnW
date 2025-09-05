#include <stdio.h>
#include <math.h>

// Palindrome Number Calculation
void isPalindrome() {
    int num, orinum, reminder, rev = 0, temp;

    printf("Enter Value : ");
    scanf("%d", &num);
    orinum = num;

    for (temp = num; temp != 0; temp /= 10) {
        reminder = temp % 10;
        rev = rev * 10 + reminder;
    }

    if (rev == num) {
        printf("%d is a Palindrome Number.\n", num);
    } else {
        printf("%d is NOT a Palindrome Number.\n", num);
    }
}

// Armstrong Number Calculation
void isArmstrong() {
    int num, orinum, reminder, result = 0, n = 0, temp;

    printf("Enter Value : ");
    scanf("%d", &num);
    orinum = num;

    // First, count the number of digits
    for (temp = num; temp != 0; temp /= 10) {
        n++;
    }

    // Then, calculate the Armstrong sum
    for (temp = num; temp != 0; temp /= 10) {
        reminder = temp % 10;
        result += pow(reminder, n);
    }

    if (result == num) {
        printf("%d is an Armstrong Number.\n", num);
    } else {
        printf("%d is NOT an Armstrong Number.\n", num);
    }
}

// Sum of digits
void sum() {
    int num, temp, digit, total = 0;

    printf("Enter Value : ");
    scanf("%d", &num);

    for (temp = num; temp != 0; temp /= 10) {
        digit = temp % 10;
        total += digit;
    }

    printf("Sum of digits of %d is %d.\n", num, total);
}

int main() {
    int choice;

    printf("Please Select Choice.\n");
    printf("Enter 1. Check Palindrome Number.\n");
    printf("Enter 2. Check Armstrong Number.\n");
    printf("Enter 3. Sum of all digits.\n");
    printf("Enter 4. Exit.\n");
    printf("Your Choice: ");
    scanf("%d", &choice);

    switch (choice) {
        case 1:
            isPalindrome();
            break;

        case 2:
            isArmstrong();
            break;

        case 3:
            sum();
            break;

        case 4:
            printf("Exited Successfully.\n");
            break;

        default:
            printf("Invalid Choice.\n");
    }

    return 0;
}
