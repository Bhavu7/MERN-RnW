#include <stdio.h>

int main() {
	int a=5,b=10;
	
	int *c = &a;
	a = &b;
	b = *c;
	
	printf("Swap : a=%d b=%d",a,b);
	
}
