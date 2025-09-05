// Q2. Count total digits from user input

#include <stdio.h>

int main() {
    
    int n, count = 0;

    printf("Enter a number: ");
    scanf("%d", &n);

    // Special case: if the number is 0, it has exactly 1 digit
    if(n == 0)
        count = 1;

    // Loop to count digits until it becomes 0
    while(n != 0) {
    	
    	// Remove the last digit
        n = n / 10;
        count++;
    }

    printf("Total digits are : %d\n", count);

    return 0;
}
