import { DbSpace } from "@/db/schema";
import { Text, View } from "react-native";

const SpaceListItem = ({ space }: { space: DbSpace }) => {
  return (
    <View>
      <Text>{space.name}</Text>
    </View>
  );
};

export default SpaceListItem;
