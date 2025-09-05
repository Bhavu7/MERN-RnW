#include <stdio.h>

int pizza() {
	int tot, qty, price=249;
	
	printf("\n\n");
	printf("Please Enter Quantity For Pizza : ");
	scanf("%d",&qty);
	tot = qty * price;
	printf("---------------------------------\n\n");
	printf("Your Order is placed for pizza.\n\n");
	printf("----------------------------------\n");
	printf("Your Order Total is = %d",tot);
}

int burger() {
	int tot, qty, price=89;
	
	printf("\n\n");
	printf("Please Enter Quantity For Burger : ");
	scanf("%d",&qty);
	tot = qty * price;
	printf("---------------------------------\n\n");
	printf("Your Order is placed for Burger.\n\n");
	printf("----------------------------------\n");
	printf("Your Order Total is = %d",tot);
}

int frenchFries() {
	int tot, qty, price=129;
	
	printf("\n\n");
	printf("Please Enter Quantity For French Fries : ");
	scanf("%d",&qty);
	tot = qty * price;
	printf("---------------------------------\n\n");
	printf("Your Order is placed for french fries.\n\n");
	printf("----------------------------------\n");
	printf("Your Order Total is = %d",tot);
}

int main(){
	int choice;
	
	printf("\n\n");
	printf("---------------------Food Ordering System--------------------\n\n");
	printf("Enter 1. Pizza.              :  249rs \n");
	printf("Enter 2. Burger.             :  89rs \n");
	printf("Enter 3. French Fries.       :  129rs \n\n");
	printf("Enter Choice : ");
	scanf("%d",&choice);
	
	switch(choice) {
		case 1 :
			pizza();
			break;
			
		case 2 :
			burger();
			break;
			
		case 3 :
			frenchFries();
			break;
	}
}
