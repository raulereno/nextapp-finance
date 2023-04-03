import { IncomeType } from "@/models/income.model";
import mongoose, { Model, Schema } from "mongoose";
import { ExpenseType } from "./expense.model";

export interface CompanType {
  _id?: String;
  name: String;
  incomes: IncomeType[];
  expenses: ExpenseType[];
}

const companySchema = new Schema<CompanType, Model<CompanType>>({
  name: { type: String, required: true },
  incomes: [{ type: Schema.Types.ObjectId, ref: "Income", default: [] }],
  expenses: [{ type: Schema.Types.ObjectId, ref: "Expense", default: [] }],
});

export const Company =
  mongoose.models.Company || mongoose.model("Company", companySchema);
