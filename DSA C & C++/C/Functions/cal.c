#include<stdio.h>

// Function Declaration with Params
float add(float a, float b);
float sub(float a, float b);
float multi(float a, float b);
float div(float a, float b);

// Main Function
int main(){
	
	// Variable Declaration
	float num1,num2,result;
	char op;
	
	// User Input Along With Appropriate Format
	printf("Simple Calculator \n");
	printf("--------------------");
	printf("Enter the OP (eg. 5 + 7) : ");
	scanf("%f %c %f",&num1,&op,&num2);
	
	// Function Call According To Case
	switch(op){
		case '+':
			result=add(num1,num2);
			break;
		case '-':
			result=sub(num1,num2);
			break;
		case '*':
			result=multi(num1,num2);
			break;
		case '/':
//			if(num2!=0){
				result=div(num1,num2);
//			}
//			else{
//				printf("Error : Cannot Divide By ZERO!");
//			}
			break;
		default:
			printf("Invalid Choice! Please Enter Valid Choice.");	
	}
	
	// Prints Desired Output with Appropriate Format
	printf("Result of %.2f %c %.2f = %.2f",num1,op,num2,result);
}

// Functions along with calculation logic
float add(float a,float b){
	return a+b;
}
float sub(float a,float b){
	return a-b;
}
float multi(float a,float b){
	return a*b;
}
float div(float a,float b){
	if (b != 0) {
		return a/b;
	}
	else {
		printf("Error : Cannot Divide By ZERO! \n");
	}
}
