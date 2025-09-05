#include <stdio.h>

int main() {
	int num[5] = {1,2,3,4,5};
	int i;
	//	int num[5];
	//  num[0] = 1;
	//  num[1] = 2;
//	printf("%d",num[0]);
	
	int size = sizeof(num) / sizeof(num[0]);
	for(i=0;i<size;i++) {
		printf("%d",num[(size - 1) - i]);
	}
}
