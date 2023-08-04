import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [action, setAction] = useState("home");

  useEffect(() => {
    if (action == "scanner") {
      const getBarCodeScannerPermissions = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      };
      getBarCodeScannerPermissions();
    }
  }, [action]);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  if (hasPermission === null && action == "scanner") {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false && action == "scanner") {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {action == "home" ? (
        <Pressable
          style={styles.btn}
          onPress={() => {
            setAction("scanner");
          }}
        >
          <Text style={styles.text}>Escanear Qr-code</Text>
        </Pressable>
      ) : scanned && action == "scanner" ? (
        <View style={styles.containerButtons}>
          <Button
            title={"Escanear novamente"}
            onPress={() => setScanned(false)}
          />
          <Button
            title={"Inicio"}
            onPress={() => {
              console.log("chamou inicio");
              setScanned(false);
              setAction("home");
            }}
          />
        </View>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
  btn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  containerButtons: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
});
