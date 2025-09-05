#include <stdio.h>

int main() {
//	Variable Declarations
	int a, b, sum, sub, mul, div;
	
	printf("Enter a : ");
	scanf("%d",&a);
	
	printf("Enter b : ");
	scanf("%d",&b);
	
//	Calculations using arithmatic operations
	sum = a+b;
	sub = a-b;
	mul = a*b;
	div = a/b;
	
//	Printing the valid calculations
	printf("Addition for a and b are as follows : %d",sum);
	printf("\n Subtraction for a and b are as follows : %d",sub);
	printf("\n Multiplication for a and b are as follows : %d",mul);
	printf("\n Division for a and b are as follows : %d",div);
}
