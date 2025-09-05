// Q1. Alphabet Skipper

#include <stdio.h>

int main() {
    int i = 0;
    // ASCII value of 'a'
    char a = 97;

    // Loop runs 7 times using do-while
    do {
        printf("%c \n", a);
        
        // Skip 3 letters
        a += 4;
        i++;
        
    // Loop until 7 characters are printed
    } while(i < 7);

    return 0;
}

