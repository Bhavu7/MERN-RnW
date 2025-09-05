#include <stdio.h>

// Function for Addition
int addition(int a, int b) { return a + b; }

// Function for Subtraction
int subtract(int a, int b) { return a - b; }

// Function for Multiplication
int multiply(int a, int b) { return a * b; }

// Function for Division
float divide(int a, int b) {
    if (b != 0)
        return (float)a / b;
    else {
        printf("Cannot divide by ZERO.\n");
        return 0;
    }
}

// Function for Modulus
int mod(int a, int b) {
    if (b != 0) return a % b;
    else {
        printf("Cannot perform modulus by ZERO.\n");
        return 0;
    }
}

// Main Function
int main() {
    int choice, num1, num2;

    while (1) {
        // User Choice
        printf("====== Simple Calculator ========\n");
        printf("=================================\n");
        printf("\nPress 1 for +\n");
        printf("Press 2 for -\n");
        printf("Press 3 for *\n");
        printf("Press 4 for /\n");
        printf("Press 5 for %%\n");
        printf("Press 0 to Exit\n");
        printf("----------------------------------\n");
        printf("Enter your choice: ");
        scanf("%d", &choice);
        printf("----------------------------------\n");

		// Exit Message
        if (choice == 0) {
            printf("Exiting the calculator. Goodbye!\n");
            break;
        }
        
        // Invalid Choice
        if (choice >= 6) {
        	printf("Invalid choice. Try again.\n");
        	printf("----------------------------------\n\n");
        	continue;
		}

        // Input two numbers
        printf("Enter the first number: ");
        scanf("%d", &num1);
        printf("Enter the second number: ");
        scanf("%d", &num2);
        printf("----------------------------------\n");

		// Case Execution According to User Choice
        switch (choice) {
            case 1:
            	// Addition
                printf("Addition of %d and %d is %d\n\n", num1, num2, addition(num1, num2));
                break;
            case 2:
            	// Subtraction
                printf("Subtraction of %d and %d is %d\n\n", num1, num2, subtract(num1, num2));
                break;
            case 3:
            	// Multiplication
                printf("Multiplication of %d and %d is %d\n\n", num1, num2, multiply(num1, num2));
                break;
            case 4:
            	// Division
                if (num2 != 0)
                    printf("Division of %d and %d is %.2f\n\n", num1, num2, divide(num1, num2));
                break;
            case 5:
            	// Modulus
                if (num2 != 0)
                    printf("Modulus of %d and %d is %d\n\n", num1, num2, mod(num1, num2));
                break;
            default:
            	// Error Handling
                printf("Invalid choice. Try again.\n\n");
        }
    }

    return 0;
}

