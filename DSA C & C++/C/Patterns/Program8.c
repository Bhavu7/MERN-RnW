#include <stdio.h>

int main() {
	int i,j,k;
	
	for(i=0;i<=5;i++) {
		
		for(k=0;k<i;k++) {
			printf("   ");
		}
		
		for(j=i;j<=5;j++) {
			printf(" * ");
		}
		printf("\n");
	}
	
	for(i=0;i<=5;i++) {
		
		for(k=0;k<5-i;k++) {
			printf("   ");
		}
		
		for(j=0;j<=i;j++) {
			printf(" * ");
		}
		printf("\n");
	}
}
