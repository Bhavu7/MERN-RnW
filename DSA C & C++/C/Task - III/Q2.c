// Floyd's Triangle using nested  for loop

#include <stdio.h>

int main() {
    int i, j;
    // Starting number
    int num = 11;

	// Number of rows
    for(i = 0; i < 4; i++) {
    	
    	// Numbers per row
        for(j = 0; j <= i; j++) {
        	
        	// Starts from 11
            printf("%d ", num++);
        }
        
        printf("\n");
    }
}
