import { Component, OnInit } from '@angular/core';
import { ExpenseItem } from './Models/ExpenseItem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  ngOnInit(): void {

  }
  public items: ExpenseItem[] = [];

  public salary: number = 1000;
  public month: string = 'January';
  public total: number = 0;

  public AddExpense() {
    this.items.push(new ExpenseItem('Name'));
  }

  public Calculate() {
    let dummyExpense = new ExpenseItem('dummy');
    let totalValue = this.items.reduce((a, b) => {
      a.Amount = a.Amount + b.Amount;
      return a;
    }, dummyExpense);
    this.total = totalValue.Amount;
    console.log(this.total);
  }

  public Save() {
    const fileName = 'expenses.txt';
    let fileContent = `${this.month}\n${this.salary}\n`;
    this.items.forEach((element) => {
      fileContent =
        fileContent +
        `${element.Name},${element.Amount},${element.Remarks},${element.Status}\n`;
    });
    const file = new Blob([fileContent.slice(0,fileContent.length - 1)], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = fileName;
    link.click();
    link.remove();
  }

  public async Upload(e: any) {
    const file: File = e.target.files[0];
    const fileContent = await file.text();
    let lines = fileContent.split('\n')
    let header = lines.splice(0,2)
    this.salary = parseInt(header[1])
    this.month = header[0]
    lines.forEach((line) => {
      let expenseItems = line.split(',')
      let expenseItem = new ExpenseItem(expenseItems[0],parseInt(expenseItems[1]),expenseItems[2],(/true/i).test(expenseItems[3]))
      this.items.push(expenseItem)
    })
    this.Calculate();
  }

  public ChangeInAmount(i: ExpenseItem, index: number, e: Event) {
    let amount = (e.target as HTMLInputElement).value;
    this.items[index].Amount = parseInt(amount);
    this.Calculate();
  }

  public ChangeInName(i: ExpenseItem, index: number, e: Event) {
    let Name = (e.target as HTMLInputElement).value;
    this.items[index].Name = Name;
  }

  public ChangeInRemarks(i: ExpenseItem, index: number, e: Event) {
    let Remarks = (e.target as HTMLInputElement).value;
    this.items[index].Remarks = Remarks;
  }

  public isItemDone(i: ExpenseItem, index: number){
    return this.items[index].Status;
  }

  public toggleCheck(i: ExpenseItem, index: number){
    this.items[index].Status = !this.items[index].Status
  }
}
