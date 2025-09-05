#include<iostream>
using namespace std;

class Person{
	private:
		string name;
		int sal;
		
	protected:
		int age;
		
	public:
		void setData(){
			cout<<"Enter name : ";
			cin >> name;
			cout<<"Enter salary : ";
			cin >> sal;
			cout<<"Enter age : ";
			cin >> age;
		}
		
		void dispData() {
			cout<<"Name : "<<name<<endl;
			cout<<"Salary : "<<sal<<endl;
		}
};

class Child:public Person{
	private:
		string gender;
		string state;
		
	public:
		void setChildData(){
			cout<<"Enter gender : ";
			cin >> gender;
			cout<<"Enter state : ";
			cin >> state;
		}
		
		void dispChildData() {
			cout<<"----Person's Info----"<<endl;
			dispData();
			cout<<"Age : "<<age<<endl;
			cout<<"Gender : "<<gender<<endl;
			cout<<"State : "<<state<<endl;
		}
};

int main(){
	Child c1;
	
	c1.setData();
	c1.setChildData();
	c1.dispChildData();
}
