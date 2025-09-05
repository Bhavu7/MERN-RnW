#include <iostream>
using namespace std;

// Structure for Linked List
class Node {
public:
    int data;
    Node* next;

    // Constructor
    Node(int value) {
        data = value;
        next = nullptr;
    }
};

// Base Class
class LinkedList {
private:
    // Head pointer of linked list
    Node* head;

public:
    // Constructor
    LinkedList() {
        head = nullptr;
    }

    // Append at the end
    void append(int data) {
        Node* newNode = new Node(data);
        if (head == nullptr) {
            head = newNode;
            return;
        }
        Node* temp = head;
        while (temp->next != nullptr) {
            temp = temp->next;
        }
        temp->next = newNode;
    }

    // Display all nodes
    void display() {
        if (head == nullptr) {
            cout << "Linked List is empty!" << endl;
            return;
        }
        Node* temp = head;
        cout << "Linked List: ";
        while (temp != nullptr) {
            cout << temp->data << " -> ";
            temp = temp->next;
        }
        cout << "NULL" << endl;
    }

    // Insert at beginning
    void insert_at_beginning(int data) {
        Node* newNode = new Node(data);
        newNode->next = head;
        head = newNode;
    }

    // Search a value
    bool search(int key) {
        Node* temp = head;
        while (temp != nullptr) {
            if (temp->data == key) {
                cout << "Element " << key << " found in the list!" << endl;
                return true;
            }
            temp = temp->next;
        }
        cout << "Element " << key << " not found in the list!" << endl;
        return false;
    }

    // Delete node by value
    void delete_node(int key) {
        if (head == nullptr) {
            cout << "List is empty. Nothing to delete." << endl;
            return;
        }

        // If Head Node is Present itself in List, it'll delete node
        if (head->data == key) {
            Node* temp = head;
            head = head->next;
            delete temp;
            cout << "Element " << key << " deleted from the list!" << endl;
            return;
        }

        Node* prev = nullptr;
        Node* curr = head;
        while (curr != nullptr && curr->data != key) {
            prev = curr;
            curr = curr->next;
        }

        if (curr == nullptr) {
            cout << "Element " << key << " not found!" << endl;
            return;
        }

        prev->next = curr->next;
        delete curr;
        cout << "Element " << key << " deleted successfully!" << endl;
    }

    // Reverse linked list
    void reverse() {
        Node* prev = nullptr;
        Node* curr = head;
        Node* next = nullptr;

        while (curr != nullptr) {
            // store next node
            next = curr->next;
             // reverse current node pointer
            curr->next = prev;
            prev = curr;
            curr = next;
        }
        head = prev;
        cout << "Linked List reversed successfully!" << endl;
    }
};

// Main Code
int main() {
    LinkedList list;

    // Append elements
    list.append(10);
    list.append(20);
    list.append(30);
    list.display();

    // Insert at beginning
    list.insert_at_beginning(5);
    list.display();

    // Search operation
    list.search(20);
    list.search(99);

    // Delete operation
    list.delete_node(20);
    list.display();

    // Reverse operation
    list.reverse();
    list.display();

    return 0;
}
