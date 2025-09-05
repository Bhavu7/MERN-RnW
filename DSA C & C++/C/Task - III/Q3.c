// Left Half Triangle using nested for loop

#include <stdio.h>

int main() {
    int i, j, k;

    for(i = 0; i < 5; i++) {
    	
        // Print spaces
        for(k = 0; k < 4 - i; k++) {
            printf("  ");
        }

        // Print numbers from (5 - i) to 5
        for(j = 5 - i; j <= 5; j++) {
            printf(" %d", j);
        }

        printf("\n");
    }
}
