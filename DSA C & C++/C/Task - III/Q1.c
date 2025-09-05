// Right Half Triangle using nested for loop

#include <stdio.h>

int main() {
    int i, j;

	// Print rows
    for(i = 1; i <= 5; i++) {
    
    	// Numbers per row
        for(j = 0; j < i; j++) {
        
        // starts from 41
            printf("%d ", 41 + j);
        }
        printf("\n");
    }
}
