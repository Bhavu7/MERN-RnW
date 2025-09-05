#include <stdio.h>

int main() {
	int r=10,i,j;
	float dist;
	
	for(i=0;i<=2*r;i++) {
		for(j=0;j<=2*r;j++) {
			dist = sqrt((i-r)*(i-r)+(j-r)*(j-r));
			
			if(dist > r - 0.5 && dist < r + 0.5) {
				printf("*");
			}
			else {
				printf(" ");
			}
		}
		printf("\n");
	}
}
