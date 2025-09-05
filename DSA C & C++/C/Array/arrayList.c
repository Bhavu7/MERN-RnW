#include <stdio.h>

int main() {
	char buffer[100];
	int index = 0;
	int i = 0;
	int str_num = 1;
	
	for(i = 0; i < 3; i++) {
		char temp[20];
		printf("Enter String %d : ", i + 1);
		scanf("%s", temp);
		
		int j = 0;
		while (temp[j] != '\0') {
			buffer[index++] = temp[j++];
		}
		buffer[index++] = '\0';
	}
	
	printf("\n Stored Strings : \n");
	
	while (i < index) {
		printf("String %d : %s\n", str_num++, &buffer[i]);
		while (buffer[i++] != '\0');
	}
	return 0;
}
