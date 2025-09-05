// Custom Alphabetic Pattern using nested for loop

#include <stdio.h>

int main() {
    int i, j;

	// Print rows
    for(i = 0; i < 5; i++) {
    	
    	// Printing 1st and 3rd row
    	if(i == 0 || i == 2) {
    		for(j = 0; j < 5; j++) {
    			printf("* ");
			}
			
		// printing 2nd row
		} else if (i == 1){
			printf("*       *");
		} else {
			printf("*");
		}
		printf("\n");
    }
    printf("\n");
}
