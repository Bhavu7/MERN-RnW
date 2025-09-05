#include <stdio.h>

int main() {
	int i,j,k;
	
//	Triangle
	for(i=0;i<=5;i++) {

		for(k=i;k<5;k++) {
			printf(" ");
		}
		
		for(j=0;j<=i;j++) {
			printf(" *");
		}
		printf("\n");
	}
	
//	Reversed Triangle
	for(i=0;i<=4;i++) {

		for(k=0;k<=i;k++) {
			printf(" ");
		}
		
		for(j=i;j<=4;j++) {
			printf(" *");
		}
		printf("\n");
	}
}
