import {
  Text,
  SafeAreaView,
  View,
  Image,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import RideCard from "@/components/RideCard";
import { useFetch } from "@/lib/fetch";
import { useUser } from "@clerk/clerk-expo";
import { images } from "@/constants";
import { Ride } from "@/types/type";

const Rides = () => {
  const { user } = useUser();
  const { data: recentRides, loading } = useFetch<Ride[]>(
    `/(api)/ride/${user?.id}`
  );
  return (
    <SafeAreaView className="bg-general-500">
      <FlatList
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-5"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingBottom: 100,
        }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center">
            {!loading ? (
              <>
                <Image
                  className="w-40 h-40"
                  source={images.noResult}
                  alt="no recent rides found"
                  resizeMode="contain"
                />
                <Text className="text-sm"> No recent rides found </Text>
              </>
            ) : (
              <ActivityIndicator size="small" color="#000" />
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <Text className="text-2xl font-JakartaBold my-5">Ride History</Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Rides;
