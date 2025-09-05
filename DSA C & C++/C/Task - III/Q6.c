// Custom numeric pattern using nested for loop

#include <stdio.h>

int main() {
    int i, j, rows = 5;

    for(i = 1; i <= rows; i++) {
        // Print left increasing numbers
        for(j = 1; j <= i; j++) {
            printf("%d ", j);
        }

        // Print middle space
        for(j = 1; j <= 2 * (rows - i); j++) {
            printf("  ");
        }

        // Print right decreasing numbers
        for(j = 1; j <= i; j++) {
            printf("%d ", i - j + 1);
        }

        printf("\n");
    }
}

