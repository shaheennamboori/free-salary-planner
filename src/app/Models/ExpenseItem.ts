export class ExpenseItem {
  public Name!: string;
  public Amount!: number;
  public Remarks!: string;
  public Status!: boolean;

  constructor(Name:string,
    Amount:number = 0,
    Remarks:string = '',
    Status:boolean = false){
    this.Name = Name;
    this.Amount = Amount;
    this.Remarks = Remarks;
    this.Status = Status;
  }
}
