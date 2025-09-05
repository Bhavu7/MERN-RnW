// L Pattern

#include <stdio.h>

int main() {
	int i,j,k;
	
	for(i=0;i<=5;i++) {
		for(j=i;j<=i;j++) {
			printf(" * ");
		}
		printf("\n");
	}
	for(k=0;k<=4;k++) {
		printf(" * ");
	}
}
