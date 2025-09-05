#include<iostream>
using namespace std;

class Person{
	private:
		string name;
		int sal;
		
	protected:
		int age;
		
	public:
		void setData(string n, int s, int a){
			name = n;
			sal = s;
			age = a;
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
		void setChildData(string gen, string st){
			gender = gen;
			state = st;
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
	c1.setData("Bhavesh", 25000, 21);
	c1.setChildData("Male", "Gujarat");
	c1.dispChildData();
}
