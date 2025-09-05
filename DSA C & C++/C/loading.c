#include <stdio.h>
#include <unistd.h>

int main() {
	while(1) {
		printf("Loading...[");
		fflush(stdout);
		
		for(int i=0;i<=20;i++) {
			printf("#");
			fflush(stdout);
			sleep(1);
		}
		
		printf("] Done \n");
		sleep(2);
		system("Clear");
	}
}
