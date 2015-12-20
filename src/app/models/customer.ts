export class Customer{
 public id:number;
 public firstName:string;
 public lastName:string;
 public gender:string;
 public city: string
 public state: { abbreviation: string, name: string }
 public orderTotal:number;
}