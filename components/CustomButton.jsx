import { Pressable, StyleSheet, Text, View } from "react-native";

const CustomButton = ({text, color, bg, onPress})=> {
  return (
    <Pressable style={{backgroundColor: bg, borderRadius: 8}} onPress={onPress}>
        <View style={styles.btn}>
            <Text style={{color: color, fontSize: 16, fontWeight: "600"}}>{text}</Text>
        </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgb(175, 164, 255)",
    borderRadius: 4
  },
});

export default CustomButton;