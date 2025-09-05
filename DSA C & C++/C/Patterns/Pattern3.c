#include <stdio.h>

int main() {
	int i,j,k;
	
	for(i=0;i<=5;i++) {
		for(j=i;j<=5;j++) {
			printf(" * ");
		}
		
		for(k=0;k<=5;k++) {
			printf(" ");
		}
		printf("\n");
	}
	
	for(i=0;i<=5;i++) {
		for(j=0;j<=i;j++) {
			printf(" * ");
		}
		
		for(k=0;k<=5;k++) {
			printf(" ");
		}
		printf("\n");
	}
}
