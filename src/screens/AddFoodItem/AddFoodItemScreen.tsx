import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useCreateFood } from '../../hooks/foods/useFoods';
import { NewFood } from './common/types';

export const AddFoodItemScreen = () => {
  const {
    mutate,
    isPending,
    error,
    data
  } = useCreateFood();

  const {
    control,
    handleSubmit,
    reset
  } = useForm<NewFood>();

  const onSubmit = (formData: NewFood) => {
    mutate(formData, {
      onSuccess: () => reset(),
    });
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="foodName"
        rules={{ required: 'Food name is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Food Name"
              value={value}
              onChangeText={onChange}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="price"
        rules={{ required: 'Price is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Price"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={text => onChange(Number(text))}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <Controller
        control={control}
        name="availableQty"
        rules={{ required: 'Quantity is required' }}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Available Quantity"
              keyboardType="numeric"
              value={value?.toString()}
              onChangeText={text => onChange(Number(text))}
            />
            {error && <Text style={styles.error}>{error.message}</Text>}
          </>
        )}
      />

      <TouchableOpacity
        onPress={handleSubmit(onSubmit)}
        disabled={isPending}
        style={styles.submitButton}
      >
        <Text style={styles.submitButtonText}>{isPending ? 'Adding...' : 'Add Food Item'}</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>Error: {error.message}</Text>}
      {data && <Text style={styles.success}>Added: {data.foodName}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
    gap: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
    borderRadius: 6,
  },
  submitButton: {
    backgroundColor: "#0C6CC9",
    borderRadius: 8,
    padding: 16
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  error: {
    color: 'red',
    marginBottom: 8
  },
  success: {
    color: 'green',
    marginTop: 12
  },
});
