// Inverted Left Half Triangle using nested for loop

#include <stdio.h>

int main() {
    int i, j, number;

    for(i = 0; i < 5; i++) {
        // Print spaces
        for(j = 0; j < i; j++) {
            printf("  ");
        }

        // Printing 1s and 0s
        number = 1;
        for(j = 0; j < 5 - i; j++) {
            printf("%d ", number);
            // Toggle between 1 and 0
            number = 1 - number;
        }

        printf("\n");
    }
}
