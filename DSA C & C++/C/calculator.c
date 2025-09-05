#include <stdio.h>

int main(){
	float num1, num2, ans;
	char choice;

//	Choice Select
	printf("Select Choice (+,-,/,*) : ");
	scanf("%c",&choice);
	
//	Enter Value
	printf("Enter Value 1 : ");
	scanf("%f",&num1);
	printf("Enter Value 2 : ");
	scanf("%f",&num2);
	
//	Perform Operations to calculate
	switch(choice) {
//		Addition
		case '+' : 
		ans = num1 + num2;
		printf("Addition of two numbers is %.2f.",ans);
		break;
		
//		Subtraction
		case '-' : 
		ans = num1 - num2;
		printf("Subtraction of two numbers is %.2f.",ans);
		break;
		
//		Division
		case '/' : 
		if(num2 == 0) {
			printf("Division Not Possible!");
		}
		else {
			ans = num1 / num2;
			printf("Division of two numbers is %.2f.",ans);
		}
		break;
		
//		Multiplication
		case '*' : 
		ans = num1 * num2;
		printf("Multiplication of two numbers is %.2f.",ans);
		break;
		
//		Modulo
//		case '%' :
//		if((int)num2 == 0) {
//			printf("Modulo Not Possible!");
//		}
//		else {
//			int modAns = (int)num1 % (int)num2;
//            printf("Modulo of two numbers is %d.\n", modAns);
//		}
		
		default : 
		printf("Please enter valid Choice.");
	}
}
