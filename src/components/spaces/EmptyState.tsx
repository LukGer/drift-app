import { PlusCircleIcon } from "lucide-react-native";
import { Text, View } from "react-native";

const SpacesEmptyState = () => {
  return (
    <View className="flex flex-row items-center gap-2 py-2 px-3 border-2 border-dashed border-gray-300 rounded-full">
      <PlusCircleIcon size={24} color="#9ca3af" />

      <Text className="text-gray-400 font-bold font-nunito">Add new space</Text>
    </View>
  );
};

export default SpacesEmptyState;
