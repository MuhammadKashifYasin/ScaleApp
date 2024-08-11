import {StyleSheet} from "react-native";

export const chooseStyle = StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        padding: 8
    },
    contentContainer: {
        width: "100%",
        aspectRatio: 2,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#d6d7da',
        backgroundColor: "white",
    },
    rightContainer: {
        flex: 17,
        height: "100%",
    },
    leftContainer: {
        flex: 11,
        height: "100%",
    }
});
