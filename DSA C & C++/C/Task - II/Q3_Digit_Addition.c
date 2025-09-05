// Q3. Alphabet Skipper

#include <stdio.h>

int main() {
    int num, first, last;

	// Get input from user
    printf("Enter a number: ");
    scanf("%d", &num);

	// last digit
    last = num % 10;

	// keep dividing to get first digit
    while(num >= 10) {
        num = num / 10;
    }

    first = num;

	// Sum of first and last digits
    printf("Sum of first and last digit is: %d\n", first + last);

    return 0;
}

