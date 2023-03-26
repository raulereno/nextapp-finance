import mongoose, { Model, Schema } from "mongoose";

export interface ExpenseType {
  _id?: String;
  type: String;
  description: String;
  category: String;
  value: number;
}

const expenseSchema = new Schema<ExpenseType, Model<ExpenseType>>(
  {
    type: { type: [String], enum: ["negocio", "personales"], required: true },
    value: { type: Number, required: true },
    description: { type: String, required: false },
    category: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

// {
//     type: {
//       type: DataTypes.ENUM,
//       values: ["negocio", "personales"],
//       allowNull: false,
//     },
//     value: {
//       type: DataTypes.FLOAT,
//       allowNull: false,
//     },
//     description: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     category: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
