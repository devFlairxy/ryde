import { View, FlatList } from "react-native";
import React from "react";
import { useDriversStore } from "@/store";
import RideLayout from "@/components/RideLayout";
import CustomButton from "@/components/CustomButton";
import { router } from "expo-router";
import DriverCard from "@/components/DriverCard";

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver } = useDriversStore();
  return (
    <RideLayout title="Choose a Driver" snapPoints={["35%", "85%"]}>
      <FlatList
        data={drivers}
        renderItem={({ item }) => (
          <DriverCard
            item={item}
            selected={selectedDriver!}
            setSelected={() => setSelectedDriver(Number(item.id))}
          />
        )}
        ListFooterComponent={() => (
          <View className="mx-5 mt-10">
            <CustomButton
              title="Select Ride"
              onPress={() => router.push("/(root)/book-ride")}
              className="mt-5"
            />
          </View>
        )}
      />
    </RideLayout>
  );
};

export default ConfirmRide;
