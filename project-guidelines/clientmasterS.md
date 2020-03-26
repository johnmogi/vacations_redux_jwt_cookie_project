1. npx create-react-app client --template typescript cd client
2. npm i react-router-dom @types/react-router-dom
3. npm install @material-ui/core
4. folder structure:<br>
  index.tsx (layout) import 'bootstrap/dist/css/bootstrap.min.css'; components: layout header sidebar main footer
5. index.tsx:<br>
  import React from "react"; import ReactDOM from "react-dom"; import "bootstrap/dist/css/bootstrap.min.css"; import { Layout } from "./components/layout/layout"; ReactDOM.render(

  <layout>, document.getElementById("root"));</layout>

6. layout.tsx:<br>
  import React, { Component } from "react"; import "./layout.css"; export class Layout extends Component { render() { return (
7. insert navbar into header as an added component
8. build extended layout (updated version):<br>
  import React, { Component } from "react"; import "./layout.css"; import { BrowserRouter, NavLink, Switch, Route } from "react-router-dom"; import Navbar from "react-bootstrap/Navbar"; import { Home } from "../home/home"; export class Layout extends Component { render() { return (

9. **take notice not to invest in design- only when time permits and all other jobs are done.**

10. build model:<br>
  export class RestoModel { public constructor(public restName?: string) {} }
11. display all items:<br>
  reviews (partial):<br>
  import React, { Component } from "react"; import "./reviews.css"; import { ReviewModel } from "../models/review-model"; // import { NavLink } from "react-router-dom"; interface reviewsState { reviews: ReviewModel[]; } export class Reviews extends Component

  <any, reviewsstate=""> {
  public constructor(props: any) {
  super(props);
  this.state = {
  reviews: []     };   }
  public componentDidMount(): void {
  fetch("<a href="http://localhost:3100/api/reviews">http://localhost:3100/api/reviews</a>")
  .then(response =&gt; response.json())
  .then(reviews =&gt; this.setState({ reviews }))
  .catch(err =&gt; alert(err.message));
  }
  public render(): JSX.Element {
  return (
  </any,>

  <div classname="reviews">
    <p>
  </p>
    <pre>

    <code>&lt;h2&gt;Here are our {this.state.reviews.length} reviews&lt;/h2&gt;
  {this.state.reviews.map(rev =&gt; (
  // &lt;NavLink to={"/salaries-per-emp/" + rev.id} key={rev.id}&gt;
  &lt;div className="rev"&gt;
    date: {rev.date} &lt;br /&gt;
    restCode: {rev.restCode} &lt;br /&gt;
    review: {rev.review} &lt;br /&gt;
    visitor: {rev.visitor} &lt;br /&gt;
  &lt;/div&gt;
  // &lt;/NavLink&gt;
  ))}
  </code>
  </pre>
    <p>
  </p>
  </div>

  ); } }

12. FAIL insert + select - retrace:<br>
  import React, { Component, ChangeEvent } from "react"; import "./insert.css"; import { EmployeeModel } from "../../models/employee"; import { SalaryModel } from "../../models/salary"; interface InsertState { employees: EmployeeModel[], salary: SalaryModel } export class Insert extends Component

  <any, insertstate=""> {
  public constructor(props: any) {</any,>

  ```
  super(props);
  this.state = {
    employees: [],
    salary: new SalaryModel()
  };
  ```

  } public componentDidMount(): void {

  ```
  fetch("http://localhost:3000/api/employees")
    .then(response => response.json())
    .then(employees => this.setState({ employees }))
    .catch(err => alert(err.message));
  ```

  } private setEmployeeID = (args: ChangeEvent

  <htmlselectelement>) =&gt; {</htmlselectelement>

  ```
  const employeeID = +args.target.value;
  const salary = { ...this.state.salary };
  salary.employeeID = employeeID;
  this.setState({ salary });
  ```

  }; private setDate = (args: ChangeEvent

  <htmlinputelement>) =&gt; {</htmlinputelement>

  ```
  const date = args.target.value;
  const salary = { ...this.state.salary };
  salary.date = date;
  this.setState({ salary });
  ```

  }; private setSalary = (args: ChangeEvent

  <htmlinputelement>) =&gt; {</htmlinputelement>

  ```
  const sal = +args.target.value;
  const salary = { ...this.state.salary };
  salary.salary = sal;
  this.setState({ salary });
  ```

  }; private addSalary = () => {

  ```
  const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    },
    body: JSON.stringify(this.state.salary)
  };
  fetch("http://localhost:3000/api/salaries", options)
    .then(response => response.json())
    .then(salary => alert("Salary has been added. ID: " + salary.id))
    .catch(err => alert(err.message));
  ```

  }; public render(): JSX.Element {

  ```
  return (
    <div className="insert">
        <h2>Insert new Salary: </h2>
        <form>
            <select onChange={this.setEmployeeID}>
                <option disabled selected>Select Employee</option>
                {this.state.employees.map(emp =>
                    <option key={emp.id} value={emp.id}>
                        {emp.firstName + " " + emp.lastName}
                    </option>
                )}
            </select>
            <br /><br />
            <input type="date" onChange={this.setDate} value={this.state.salary.date} />
            <br /><br />
            <input type="number" onChange={this.setSalary} value={this.state.salary.salary} />
            <br /><br />
            <button type="button" onClick={this.addSalary}>Add Salary</button>
        </form>
    </div>         );     } }
  ```

  // todo 404

13. basic layout

14. build models:<br>
  export class BidModel { public constructor( public bidId?: number, public productId?: number, public bidStart?: string, public bidderName?: string, public productName?: string, public bidPrice?: number ) {} }

15. component fetch:<br>
  public componentDidMount(): void { fetch("<http://localhost:3333/api/cats>") .then(response => response.json()) .then(cats => this.setState({ cats })) .catch(err => alert(err.message)); }

here are our X products
