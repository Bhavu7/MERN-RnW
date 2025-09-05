#include <stdio.h>

void printLine(int starsLeft, int spaces, int starsRight) {
	int i;  // declare once here

	for (i = 0; i < starsLeft; i++) printf("*");
	for (i = 0; i < spaces; i++) printf(" ");
	for (i = 0; i < starsRight; i++) printf("*");

	printf("\n");
}

