import { DbSpace } from "@/db/schema";
import { Text, TouchableOpacity } from "react-native";

type HomeSpaceListItemProps = {
  space: DbSpace;
  onPress: () => void;
};

const HomeSpaceListItem = ({ space, onPress }: HomeSpaceListItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center gap-2 py-2 px-3 rounded-full"
      style={{
        backgroundColor: space.colorHex ?? "#FFF",
      }}
    >
      {space.icon && <Text>{space.icon}</Text>}

      <Text className="text-white font-bold font-nunito">{space.name}</Text>
    </TouchableOpacity>
  );
};

export default HomeSpaceListItem;
