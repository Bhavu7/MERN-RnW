#include <stdio.h>

int main(){
	int a = 7, b = 3;
	
	int *p = &a;
	int *q = &b;
	
	printf("Before swap : a = %d, b = %d\n", a, b);
	
	*p = *p + *q;
	*q = *p - *q;
	*p = *p - *q;
	
	printf("After Swap : a = %d, b = %d\n", a, b);
}
