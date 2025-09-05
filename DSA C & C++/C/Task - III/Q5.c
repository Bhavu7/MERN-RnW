// Full Pyramid using nested for loop

#include <stdio.h>

int main() {
    int i, j;

    for(i = 0; i < 5; i++) {
        // Print leading spaces
        for(j = 0; j < 4 - i; j++) {
            printf("  ");
        }

        // Ascending from (5 - i) to 5
        int num;
        for(num = 5 - i; num <= 5; num++) {
            printf("%d ", num);
        }

        // Descending from 4 to (5 - i) using only ++
        int limit = 5 - i;
        for(num = limit; num < 5; num++) {
            printf("%d ", 5 - (num - limit + 1));
        }

        printf("\n");
    }
}
