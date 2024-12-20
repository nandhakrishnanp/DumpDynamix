import React, { useEffect, useState } from 'react';
import { Modal, Pressable, StyleSheet, Text, TextInput, TouchableNativeFeedback, View, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import axiosInstance from '../../../../../axiosconfig';
import CustomStyle from '../../../../../custom';
import AddIcon from '../../../../../assets/Add.svg';
import Toast from 'react-native-toast-message';
import { format } from 'date-fns';

const Log = ({ tyre_id }: any) => {
  const [tyreExpense, setTyreExpense] = useState<any>(null);
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [expenseData, setExpenseData] = useState({
    tyre_id: tyre_id,
    cost: '',
    costReason: '',
    remarks: '',
  });

  const options =[
    'Repair', 
    'Puncture', 
    'Replacement', 
    'Alignment/Rotation', 
    'Wear and Tear', 
    'Tread Damage', 
    'Sidewall Damage', 
    'Valve Replacement', 
    'Overload Damage', 
    'Heat Damage', 
    'Accidental Damage', 
    'Retreading'
  ];

 
  const getTyreExpensebyId = async (tyre_id: any) => {
    try {
      const response = await axiosInstance.get(`/expense/get/${tyre_id}`);
      if (response.data.length > 0) {
        setTyreExpense(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTyreExpensebyId(tyre_id);
  }, [tyre_id]);

  
  const handleChange = (name: string, value: any) => {
    setExpenseData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  
  const handleSubmit = async () => {
    try {
      const response = await axiosInstance.post('/expense/add', expenseData);
      console.log('Expense added successfully', response.data);
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Expense added successfully',
      });
      getTyreExpensebyId(tyre_id);
      setIsShow(false);
    } catch (error) {
      console.log('Error adding expense:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Error adding expense',
      });
    }
  };

  return (
    <ScrollView>
  
      <TouchableNativeFeedback onPress={() => setIsShow(true)}>
        <View style={styles.addButton}>
          <AddIcon width={30} height={30} />
          <Text style={styles.addButtonText}>Add Expense</Text>
        </View>
      </TouchableNativeFeedback>

      <Modal animationType="fade" transparent visible={isShow}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <TextInput
              style={styles.input}
              placeholder="Enter cost"
              placeholderTextColor={CustomStyle.colour.accent}
              keyboardType="numeric"
              value={expenseData.cost}
              onChangeText={(value) => handleChange('cost', value)}
            />

     
            <Pressable onPress={() => setIsDropdownVisible(true)} style={styles.dropdown}>
              <Text style={styles.dropdownText}>
                {expenseData.costReason || 'Select Cost Reason'}
              </Text>
            </Pressable>

            <Modal animationType="slide" transparent visible={isDropdownVisible}>
              <View style={styles.dropdownModalOverlay}>
                <View style={styles.dropdownModalContainer}>
                  <FlatList
                    data={options}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        onPress={() => {
                          handleChange('costReason', item);
                          setIsDropdownVisible(false);
                        }}
                        style={styles.dropdownOption}
                      >
                        <Text style={styles.dropdownOptionText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <Pressable onPress={() => setIsDropdownVisible(false)} style={styles.dropdownCancel}>
                    <Text style={styles.dropdownCancelText}>Cancel</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

        
            <TextInput
              style={styles.input}
              placeholder="Remarks"
              placeholderTextColor={CustomStyle.colour.accent}
              value={expenseData.remarks}
              onChangeText={(value) => handleChange('remarks', value)}
            />

           
            <Pressable onPress={()=>{
              handleSubmit()
            }}>
              <View style={styles.submitButton}>
                <AddIcon width={30} height={30} />
                <Text style={styles.submitButtonText}>Add Expense</Text>
              </View>
            </Pressable>

            <Pressable onPress={() => setIsShow(false)}>
              <View style={styles.cancelButton}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.recentExpensesTitle}>Recent Expenses</Text>

        
      {tyreExpense ? (
        tyreExpense.map((expense: any) => (
          <View key={expense._id} style={{
            padding:18,
            backgroundColor:CustomStyle.colour.primary,
            margin:10,
            borderRadius:8
          }}>
            <Text style={{
              color:CustomStyle.colour.background,
              fontWeight:"700",
              fontSize:17
            }}> Cost : {expense.cost}</Text>
            <Text style={{
              color:CustomStyle.colour.background,
              fontWeight:"700",
              fontSize:17
            }}> Reason : {expense.costReason}</Text>
            <Text style={{
              color:CustomStyle.colour.background,
              fontWeight:"700",
              fontSize:17
            }}> Remarks : {expense.remarks}</Text>
            <Text style={{
              color:CustomStyle.colour.background,
              fontWeight:"700",
              fontSize:17
            }}> Date : {format(expense.date,'dd-MM-yyyy')}</Text>
          </View>
        ))
      ) : (
        <View style={styles.noExpensesContainer}>
          <Text style={styles.noExpensesText}>No Recent Expenses Found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default Log;

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: CustomStyle.colour.primary,
    padding: 10,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  addButtonText: {
    color: CustomStyle.colour.background,
    fontWeight: 'bold',
  },
  modalOverlay: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    backgroundColor: CustomStyle.colour.background,
    padding: 10,
    width: '85%',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: CustomStyle.colour.primary,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 40,
    borderColor: CustomStyle.colour.primary,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dropdownText: {
    color: CustomStyle.colour.accent,
  },
  dropdownModalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdownModalContainer: {
    backgroundColor: CustomStyle.colour.background,
    padding: 10,
    width: '80%',
    borderRadius: 10,
  },
  dropdownOption: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: CustomStyle.colour.accent,
  },
  dropdownOptionText: {
    color: CustomStyle.colour.accent,
    fontWeight:"700"
  },
  dropdownCancel: {
    padding: 10,
    alignItems: 'center',
  },
  dropdownCancelText: {
    color: CustomStyle.colour.primary,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: CustomStyle.colour.primary,
    padding: 8,
    margin: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  submitButtonText: {
    color: CustomStyle.colour.background,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: CustomStyle.colour.background,
    padding: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: CustomStyle.colour.primary,
    gap: 10,
  },
  cancelButtonText: {
    color: CustomStyle.colour.primary,
    fontWeight: 'bold',
  },
  recentExpensesTitle: {
    padding: 10,
    paddingHorizontal: 20,
    fontWeight: '700',
    fontSize: 17,
  },
  expenseItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: CustomStyle.colour.primary,
  },
  noExpensesContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  noExpensesText: {
    fontSize: 15,
    color: CustomStyle.colour.primary,
  },
});
