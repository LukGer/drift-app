import { DbExpense } from "@/db/schema";
import { Text, TouchableOpacity } from "react-native";

const HomeExpenseListItem = ({ expense }: { expense: DbExpense }) => {
  return (
    <TouchableOpacity>
      <Text>{expense.description}</Text>
    </TouchableOpacity>
  );
};

export default HomeExpenseListItem;
